variable "secret_name" {
  type        = string
  description = "Name of the Secrets Manager secret"
}

variable "rds_endpoint" {
  type        = string
  description = "Endpoint of the RDS instance"
}

variable "db_username" {
  type        = string
  description = "Username for the RDS instance"
  default     = "dbuser"
}

variable "db_password" {
  type        = string
  description = "Password for the RDS instance"
  sensitive   = true
}