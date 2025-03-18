output "lambda_arn" {
  value       = aws_lambda_function.api.arn
  description = "ARN of the Lambda function"
}

output "lambda_name" {
  value       = aws_lambda_function.api.function_name
  description = "Name of the Lambda function"
}