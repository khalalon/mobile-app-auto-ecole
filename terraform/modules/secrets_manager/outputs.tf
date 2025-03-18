output "secret_arn" {
  value       = aws_secretsmanager_secret.db.arn
  description = "ARN of the Secrets Manager secret"
}