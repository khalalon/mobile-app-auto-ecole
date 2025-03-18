resource "aws_cloudwatch_log_group" "api_gateway_logs" {
  name              = "/aws/apigateway/MyHttpAPI-prod"
  retention_in_days = 7
  tags = {
    Name        = "api-gateway-logs"
    Environment = "prod"
    Project     = "my-app"
  }
}

resource "aws_iam_role" "api_gateway_logs" {
  name = "api-gateway-logs-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "apigateway.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = {
    Name        = "api-gateway-logs-role"
    Environment = "prod"
    Project     = "my-app"
  }
}

resource "aws_iam_role_policy" "api_gateway_logs" {
  role = aws_iam_role.api_gateway_logs.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["logs:CreateLogStream", "logs:PutLogEvents"]
      Resource = aws_cloudwatch_log_group.api_gateway_logs.arn
    }]
  })
}