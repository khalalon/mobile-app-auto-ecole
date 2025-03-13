provider "aws" {
  profile = "ServerlessAppPermissionSet-116981784599"
  region  = "us-east-1"
}

# --- 1. Create a KMS Key for encryption ---
resource "aws_kms_key" "my_kms_key" {
  description         = "KMS key for Lambda, API Gateway, and RDS"
  enable_key_rotation = true
}

# --- 2. Create a Cognito User Pool ---
resource "aws_cognito_user_pool" "my_user_pool" {
  name = "my-user-pool"

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
  }

  auto_verified_attributes = ["email"]
  alias_attributes         = ["email", "preferred_username"]

  tags = {
    Name = "my-user-pool"
  }
}

# --- 3. Create a Cognito User Pool Client ---
resource "aws_cognito_user_pool_client" "my_user_pool_client" {
  name         = "my-user-pool-client"
  user_pool_id = aws_cognito_user_pool.my_user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}

# --- 4. Store RDS Credentials in AWS Secrets Manager ---
resource "aws_secretsmanager_secret" "rds_credentials" {
  name        = "rds-credentials"
  kms_key_id  = aws_kms_key.my_kms_key.id
}

resource "aws_secretsmanager_secret_version" "rds_credentials_value" {
  secret_id     = aws_secretsmanager_secret.rds_credentials.id
  secret_string = jsonencode({
    PG_DATABASE = "auto_ecole"
    PG_USER     = "dbuser"
    PG_PASSWORD = "mypassword"
    PG_HOST     = aws_db_instance.my_postgres_db.address
  })
}

# --- 5. Create a Security Group for RDS (Private Access) ---
resource "aws_security_group" "rds_sg" {
  name        = "rds_sg"
  description = "Allow API Gateway and Lambda to access RDS"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    security_groups = [aws_security_group.lambda_sg.id] # Only Lambda can connect
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rds-sg"
  }
}

# --- 6. Create an RDS PostgreSQL Database in a Private Subnet ---
resource "aws_db_instance" "my_postgres_db" {
  db_name                = "auto_ecole"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  identifier             = "my-postgres-db"
  username               = "dbuser"
  password               = "mypassword"
  parameter_group_name   = "default.postgres14"
  publicly_accessible    = false  # Make it private
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
  storage_encrypted      = true
  kms_key_id             = aws_kms_key.my_kms_key.id

  tags = {
    Name = "auto-ecole-db"
  }
}

# --- 7. Create an API Gateway with Cognito Authentication ---
resource "aws_apigatewayv2_api" "my_api" {
  name          = "my-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_authorizer" "cognito_auth" {
  api_id           = aws_apigatewayv2_api.my_api.id
  name             = "cognito-auth"
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]

  jwt_configuration {
    audience = [aws_cognito_user_pool_client.my_user_pool_client.id]
    issuer   = aws_cognito_user_pool.my_user_pool.endpoint
  }
}

# --- 8. Create a Lambda Function that Connects to RDS ---
resource "aws_lambda_function" "my_lambda" {
  function_name    = "myLambdaFunction"
  runtime         = "nodejs18.x"
  handler         = "index.handler"
  role            = aws_iam_role.lambda_exec_role.arn
  filename        = "lambda.zip"
  timeout         = 10
  memory_size     = 128

  environment {
    variables = {
      SECRET_ARN = aws_secretsmanager_secret.rds_credentials.arn
    }
  }
}

# --- 9. IAM Role for Lambda to Access Secrets Manager & RDS ---
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-exec-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_policy" "lambda_secrets_policy" {
  name        = "lambda-secrets-policy"
  description = "Allow Lambda to retrieve secrets and connect to RDS"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "kms:Decrypt"
        ]
        Resource = [
          aws_secretsmanager_secret.rds_credentials.arn,
          aws_kms_key.my_kms_key.arn
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "rds:Connect"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_secrets_attach" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_secrets_policy.arn
}

# --- 10. Outputs ---
output "user_pool_id" {
  value = aws_cognito_user_pool.my_user_pool.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.my_user_pool_client.id
}

output "api_gateway_url" {
  value = aws_apigatewayv2_api.my_api.api_endpoint
}
