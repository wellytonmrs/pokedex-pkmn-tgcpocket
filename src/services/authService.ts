export interface LoginResponse {
    username: string;
}

export async function mockLogin(username: string, password: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username !== "error" && password !== "password") {
                resolve({ username});
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
}

export async function mockSignUp(username: string, password: string, friendcode?: string): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username !== "error" && password !== "password" && friendcode != '') {
                resolve({ username});
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
}