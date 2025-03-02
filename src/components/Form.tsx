import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleUser } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import SignUpForm from "./SignUpForm";

// Define the structure of the decoded JWT

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const loginUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await login(username, password);
      localStorage.setItem("dexpkmtgcpkt-info", JSON.stringify({ username }));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setError("The username or password entered are invalid.");
      setUsername("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  }, [navigate, password, username, login]);

  /*
  useEffect(() => {
    const savedUser = localStorage.getItem("dexpkmtgcpkt-info");
    if (savedUser) {
      const { username, password } = JSON.parse(savedUser);
      setUsername(username);
      setPassword(password);
      loginUser();
    }
  }, [loginUser, navigate]);
  */

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await loginUser();
  }

  function signUpReturn(newUsername: string, newPassword: string) {
    setUsername(newUsername);
    setPassword(newPassword);
    setIsSignUpOpen(false);
  }

  const googleSuccess = async (response: CredentialResponse) => {
    setIsLoading(true);
    try {
      const decoded: GoogleUser = jwtDecode<GoogleUser>(response.credential!);
      const { email, name, picture } = decoded;

      await login(undefined, undefined, { email, name, picture });
      navigate("/");
    } catch (error) {
      console.error("Failed to decode JWT or login with Google:", error);
      setError("Google Sign In failed. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const googleError = () => {
    console.error("Google Sign In was unsucessful:");
    setError("Google Sign In was unsucessful. Try again later.");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200"
      >
        <h1 className="text-5xl font-semibold">Welcome Back</h1>
        <p className="font-medium text-lg text-gray-500 mt-4">
          Welcome back! Please enter your details
        </p>
        <div className="mt-8">
          <div>
            <label htmlFor="username" className="text-lg font-medium">
              Username
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your username"
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Enter your password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="mt-4 text-red-500 font-medium text-sm">{error}</div>
          )}

          <div className="mt-8 flex flex-col gap-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl ${
                isLoading ? "bg-gray-400" : "bg-violet-500"
              } text-white text-lg font-bold`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <GoogleOAuthProvider clientId={import.meta.env.VITE_G_OA_CLIID}>
              <div className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl">
                <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
              </div>
            </GoogleOAuthProvider>
          </div>
          <div className="flex mt-8 justify-center items-center">
            <p className="font-medium text-base">Don't have an account?</p>
            <button
              type="button"
              onClick={() => setIsSignUpOpen(true)}
              className="active:scale-[.98] active:duration-75 text-violet-500 text-base font-medium ml-2"
            >
              Sign up
            </button>
          </div>
        </div>
      </form>

      {isSignUpOpen && (
        <SignUpForm
          onClose={() => setIsSignUpOpen(false)}
          onSignUp={signUpReturn}
        />
      )}
    </>
  );
}
