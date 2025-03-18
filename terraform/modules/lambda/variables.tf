variable "vpc_id" {
  type        = string
  description = "ID of the VPC"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs"
}

variable "secret_arn" {
  type        = string
  description = "ARN of the Secrets Manager secret"
}

variable "lambda_sg_id" {
  type        = string
  description = "ID of the Lambda security group"
}