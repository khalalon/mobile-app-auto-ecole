variable "vpc_id" {
  type        = string
  description = "ID of the VPC"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs"
}

variable "rds_sg_id" {
  type        = string
  description = "ID of the RDS security group"
}

variable "db_username" {
  type        = string
  description = "Username for the RDS instance"
  default     = "dbuser"
}