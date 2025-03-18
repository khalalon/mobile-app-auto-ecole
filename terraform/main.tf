provider "aws" {
  region = var.region
}

module "vpc" {
  source   = "./modules/vpc"
  vpc_cidr = var.vpc_cidr
}

module "security_groups" {
  source = "./modules/securitygroup"
  vpc_id = module.vpc.vpc_id
}

module "lambda" {
  source             = "./modules/lambda"
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  secret_arn         = module.secrets_manager.secret_arn
  lambda_sg_id       = module.security_groups.lambda_sg_id
}

module "secrets_manager" {
  source       = "./modules/secrets_manager"
  secret_name  = "db-credentials"
  rds_endpoint = module.rds.rds_endpoint
  db_password  = module.rds.db_password # Pass the generated password
}

module "rds" {
  source             = "./modules/rds"
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  rds_sg_id          = module.security_groups.rds_sg_id
  db_username        = "dbuser" # Optionally override default
}

module "api_gateway" {
  source                   = "./modules/api_gateway"
  lambda_arn               = module.lambda.lambda_arn
  lambda_name              = module.lambda.lambda_name
  cloudwatch_log_group_arn = module.logging.cloudwatch_log_group_arn
}

module "cognito" {
  source = "./modules/cognito"
}

module "vpc_endpoints" {
  source             = "./modules/vpc_endpoints"
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  vpc_endpoint_sg_id = module.security_groups.vpc_endpoint_sg_id
  region             = var.region
}

module "logging" {
  source = "./modules/logging"
}