output "vpc_id" {
  value       = aws_vpc.main.id
  description = "ID of the VPC"
}

output "private_subnet_ids" {
  value       = [aws_subnet.private_db_a.id, aws_subnet.private_db_b.id]
  description = "List of private subnet IDs"
}