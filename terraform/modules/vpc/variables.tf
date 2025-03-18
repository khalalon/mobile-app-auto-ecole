variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
}

variable "region" {
  type        = string
  description = "AWS region for subnet AZs"
  default     = "us-east-1"
}