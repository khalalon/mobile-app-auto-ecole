output "rds_endpoint" {
  value       = aws_db_instance.rds.endpoint
  description = "Endpoint of the RDS instance"
}

output "db_password" {
  value       = random_password.db_password.result
  description = "Generated password for the RDS instance"
  sensitive   = true # Mark as sensitive to avoid displaying in logs
}