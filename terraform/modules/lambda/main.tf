resource "null_resource" "prepare_lambda_layer" {
  triggers = {
    node_modules_hash = sha256(join("", [for f in fileset("${path.root}/../back-end/node_modules", "**") : filesha256("${path.root}/../back-end/node_modules/${f}")]))
  }

  provisioner "local-exec" {
    command = <<EOT
      mkdir -p ${path.module}/layer/nodejs
      cp -r ${path.root}/../back-end/node_modules ${path.module}/layer/nodejs/
    EOT
  }
}

data "archive_file" "lambda_layer_zip" {
  depends_on  = [null_resource.prepare_lambda_layer]
  type        = "zip"
  source_dir  = "${path.module}/layer"
  output_path = "${path.module}/lambda-layer.zip"
}

resource "aws_lambda_layer_version" "node_modules_layer" {
  filename            = data.archive_file.lambda_layer_zip.output_path
  layer_name          = "node_modules_layer_${random_string.suffix.result}"
  compatible_runtimes = ["nodejs18.x"]
  source_code_hash    = data.archive_file.lambda_layer_zip.output_base64sha256

}

resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
}

resource "aws_iam_role" "lambda" {
  name = "lambda-execution-role-${random_string.suffix.result}"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })

  tags = {
    Name        = "lambda-execution-role"
    Environment = "prod"
    Project     = "my-app"
  }
}

resource "aws_iam_role_policy" "lambda" {
  role = aws_iam_role.lambda.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue",
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "ec2:CreateNetworkInterface",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DeleteNetworkInterface"
        ]
        Resource = "*"
      }
    ]
  })
}

data "archive_file" "backend_zip" {
  type        = "zip"
  source_dir  = "${path.root}/../back-end"
  output_path = "${path.module}/back-end.zip"
  excludes = [
    "node_modules/**",
    ".git/**",
    "**/*.log"
  ]
}

resource "aws_lambda_function" "api" {
  filename         = data.archive_file.backend_zip.output_path
  function_name    = "api-handler-${random_string.suffix.result}"
  role             = aws_iam_role.lambda.arn
  handler          = "handlers/api.handler"
  runtime          = "nodejs18.x"
  source_code_hash = data.archive_file.backend_zip.output_base64sha256
  layers           = [aws_lambda_layer_version.node_modules_layer.arn]

  vpc_config {
    subnet_ids         = var.private_subnet_ids
    security_group_ids = [var.lambda_sg_id]
  }

  environment {
    variables = { SECRET_ARN = var.secret_arn }
  }

  memory_size = 256
  timeout     = 30

  tags = {
    Name        = "api-handler"
    Environment = "prod"
    Project     = "my-app"
  }
}