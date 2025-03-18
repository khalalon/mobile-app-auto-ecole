output "secrets_manager_endpoint_id" {
  value       = aws_vpc_endpoint.secrets_manager.id
  description = "ID of the Secrets Manager VPC endpoint"
}