# main.tf (or your Terraform file)

resource "aws_apigatewayv2_api" "api" {
  name          = "MyHttpAPI"
  protocol_type = "HTTP"
  description   = "HTTP API Gateway for Lambda backend"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    allow_headers = ["*"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.api.id
  name        = "prod"
  auto_deploy = true

  access_log_settings {
    destination_arn = var.cloudwatch_log_group_arn
    format = jsonencode({
      requestId      = "$context.requestId"
      ip             = "$context.identity.sourceIp"
      requestTime    = "$context.requestTime"
      httpMethod     = "$context.httpMethod"
      routeKey       = "$context.routeKey"
      status         = "$context.status"
      protocol       = "$context.protocol"
      responseLength = "$context.responseLength"
    })
  }

  tags = {
    Name = "prod"
  }
}

# Existing Examens Routes
resource "aws_apigatewayv2_route" "examens" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /examens"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "examens_put" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "PUT /examens/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "examens_delete" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "DELETE /examens/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# Existing Clients Routes
resource "aws_apigatewayv2_route" "clients" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /clients"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "clients_put" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "PUT /clients/{cin}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "clients_delete" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "DELETE /clients/{cin}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

# New Seances Routes
resource "aws_apigatewayv2_route" "seances" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "ANY /seances"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "seances_put" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "PUT /seances/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_route" "seances_delete" {
  api_id    = aws_apigatewayv2_api.api.id
  route_key = "DELETE /seances/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}

resource "aws_apigatewayv2_integration" "lambda" {
  api_id                 = aws_apigatewayv2_api.api.id
  integration_type       = "AWS_PROXY"
  integration_method     = "POST"
  integration_uri        = var.lambda_arn
  payload_format_version = "2.0"
}

resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayV2Invoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}