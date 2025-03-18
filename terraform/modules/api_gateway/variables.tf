variable "lambda_arn" {
  type        = string
  description = "ARN of the Lambda function"
}

variable "lambda_name" {
  type        = string
  description = "Name of the Lambda function"
}

variable "cloudwatch_log_group_arn" {
  type        = string
  description = "ARN of the CloudWatch log group"
}

variable "region" {
  type        = string
  description = "AWS region"
  default     = "us-east-1"
}