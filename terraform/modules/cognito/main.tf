resource "aws_cognito_user_pool" "my_user_pool" {
  name = "my-user-pool"

  password_policy {
    minimum_length    = 8
    require_uppercase = true
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
  }

  auto_verified_attributes = ["email"]
  alias_attributes         = ["email", "preferred_username"]

  tags = {
    Name = "my-user-pool-khalil-react-amplify-test"
  }
}

resource "aws_cognito_user_pool_client" "my_user_pool_client" {
  name         = "my-user-pool-client"
  user_pool_id = aws_cognito_user_pool.my_user_pool.id

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]
}