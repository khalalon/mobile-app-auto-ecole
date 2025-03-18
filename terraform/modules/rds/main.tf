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

  tags = {
    Name        = "mydb"
    Environment = "prod"
    Project     = "my-app"
  }
}