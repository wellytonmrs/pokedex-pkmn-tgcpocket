export interface LoginResponse {
  username: string;
  picture?: string;
}
export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
}

export async function mockLogin(
  username?: string,
  password?: string,
  googleData?: GoogleUser
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (googleData) {
        resolve({ username: googleData?.name, picture: googleData?.picture });
      } else if (
        !!username &&
        username !== "error" &&
        password !== "password"
      ) {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
}

export async function mockSignUp(
  username: string,
  password: string,
  friendcode?: string
): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username !== "error" && password !== "password" && friendcode != "") {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
}
