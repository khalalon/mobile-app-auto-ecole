output "rds_sg_id" {
  value       = aws_security_group.rds_sg.id
  description = "ID of the RDS security group"
}

output "lambda_sg_id" {
  value       = aws_security_group.lambda_sg.id
  description = "ID of the Lambda security group"
}

output "vpc_endpoint_sg_id" {
  value       = aws_security_group.vpc_endpoint_sg.id
  description = "ID of the VPC endpoint security group"
}