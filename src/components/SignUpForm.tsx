import { useState } from "react";
import { mockSignUp } from "../services/authService";

interface SignUpFormProps {
  onClose: () => void;
  onSignUp: (username: string, password: string) => void;
}

export default function SignUpForm({ onClose, onSignUp }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [friendCode, setFriendCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await mockSignUp(username, password, friendCode);
    onSignUp(username, password);
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="friendCode" className="block font-medium">
            Friend Code
          </label>
          <input
            type="text"
            id="friendCode"
            required
            value={friendCode}
            onChange={(e) => setFriendCode(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-violet-500 text-white py-2 px-4 rounded-md"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
