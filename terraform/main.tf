provider "aws" {
  profile = "ServerlessAppPermissionSet-116981784599"
  region  = "us-east-1" 
}

# Create a Cognito User Pool
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
    Name = "my-user-pool-khalil-react-amplify-test"
  }
}

# Create a User Pool Client
resource "aws_cognito_user_pool_client" "my_user_pool_client" {
  name         = "my-user-pool-client"
  user_pool_id = aws_cognito_user_pool.my_user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}

# Create a Security Group to allow external access on PostgreSQL port
resource "aws_security_group" "postgres_sg" {
  name        = "postgres_sg"
  description = "Allow inbound traffic on port 5432 for PostgreSQL"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow all IP addresses (adjust for security in production)
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "postgres-sg"
  }
}

# Create an RDS PostgreSQL database instance
resource "aws_db_instance" "my_postgres_db" {
  db_name                = "auto_ecole"  # Updated DB name to comply with RDS naming rules
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  identifier             = "my-postgres-db"
  username               = "dbuser"
  password               = "mypassword"
  parameter_group_name   = "default.postgres14"
  publicly_accessible    = true
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.postgres_sg.id]

  tags = {
    Name = "auto-ecole-db"
  }
}


# Outputs
output "user_pool_id" {
  value = aws_cognito_user_pool.my_user_pool.id
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.my_user_pool_client.id
}

output "DB_HOST" {
  value = aws_db_instance.my_postgres_db.address
}

output "DB_PORT" {
  value = aws_db_instance.my_postgres_db.port
}

output "DB_NAME" {
  value = aws_db_instance.my_postgres_db.db_name
}

output "DB_USER" {
  value = aws_db_instance.my_postgres_db.username
}

output "DB_PASSWORD" {
  value     = aws_db_instance.my_postgres_db.password
  sensitive = true
}
