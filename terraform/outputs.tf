output "vpc_id" {
  value = module.vpc.vpc_id
}

output "private_subnet_ids" {
  value = module.vpc.private_subnet_ids
}

output "endpoint" {
  value = module.api_gateway.api_endpoint
  
}
output "secret_arn" {
  value = module.secrets_manager.secret_arn
  
}
output "endpoint_rds" {
  value = module.rds.rds_endpoint
  
}