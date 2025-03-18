output "cloudwatch_log_group_arn" {
  value       = aws_cloudwatch_log_group.api_gateway_logs.arn
  description = "ARN of the CloudWatch log group"
}