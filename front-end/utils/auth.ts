import { Auth } from "aws-amplify";

export async function signUp(username: string, password: string, email: string) {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: { email },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function confirmSignUp(username: string, code: string) {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    throw error;
  }
}

export async function signIn(username: string, password: string) {
  try {
    return await Auth.signIn(username, password);
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    throw error;
  }
}
