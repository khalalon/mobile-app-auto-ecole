# Create a DB parameter group
resource "aws_db_parameter_group" "postgres_params" {
  name   = "postgres-params-mydb"
  family = "postgres15"  # Must match the engine version family

  parameter {
    name  = "rds.force_ssl"
    value = "0"  # Disable SSL enforcement
  }

  tags = {
    Name        = "postgres-params-mydb"
    Environment = "prod"
    Project     = "my-app"
  }
}

# Updated RDS instance with parameter group association
resource "aws_db_subnet_group" "rds" {
  name       = "rds-subnet-group"
  subnet_ids = var.private_subnet_ids
  tags = {
    Name        = "rds-subnet-group"
    Environment = "prod"
    Project     = "my-app"
  }
}

resource "random_password" "db_password" {
  length  = 16
  special = false
}

resource "aws_db_instance" "rds" {
  db_name                = "mydb"
  identifier             = "mydb"
  engine                 = "postgres"
  engine_version         = "15"
  instance_class         = "db.t3.micro"
  allocated_storage      = 20
  username               = var.db_username 
  password               = random_password.db_password.result
  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [var.rds_sg_id]
  skip_final_snapshot    = true
  parameter_group_name   = aws_db_parameter_group.postgres_params.name  # Associate the parameter group

  tags = {
    Name        = "mydb"
    Environment = "prod"
    Project     = "my-app"
  }
}