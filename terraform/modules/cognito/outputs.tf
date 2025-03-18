output "user_pool_id" {
  value = aws_cognito_user_pool.my_user_pool.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.my_user_pool_client.id
}