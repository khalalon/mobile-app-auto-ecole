resource "aws_vpc_endpoint" "secrets_manager" {
  vpc_id              = var.vpc_id
  service_name        = "com.amazonaws.${var.region}.secretsmanager"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = var.private_subnet_ids
  security_group_ids  = [var.vpc_endpoint_sg_id]
  private_dns_enabled = true

  tags = {
    Name        = "secrets-manager-vpc-endpoint"
    Environment = "prod"
    Project     = "my-app"
  }
}