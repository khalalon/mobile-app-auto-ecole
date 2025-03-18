variable "vpc_id" {
  type        = string
  description = "ID of the VPC"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs"
}

variable "vpc_endpoint_sg_id" {
  type        = string
  description = "ID of the VPC endpoint security group"
}

variable "region" {
  type        = string
  description = "AWS region"
}