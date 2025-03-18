resource "aws_secretsmanager_secret" "db" {
  name        = var.secret_name
  description = "Database credentials for RDS"
  tags = {
    Name        = "db-credentials"
    Environment = "prod"
    Project     = "my-app"
  }
}

resource "aws_secretsmanager_secret_version" "db_version" {
  secret_id = aws_secretsmanager_secret.db.id
  secret_string = jsonencode({
    PG_USER     = var.db_username
    PG_PASSWORD = var.db_password
    PG_DATABASE = "mydb"
    PG_HOST     = var.rds_endpoint
  })
}