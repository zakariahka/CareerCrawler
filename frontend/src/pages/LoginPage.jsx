import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onHandleSubmit() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-14 bg-white rounded-lg shadow-xl space-y-6 max-w-2xl w-full mx-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          Enter your email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Your Email"
          className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Enter your password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Your Password"
          className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <div className="text-right">
          <label className="text-blue-500 hover:text-blue-700">
            Forgot password?
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={onHandleSubmit}
        >
          Log In
        </button>
        <div className="text-center text-gray-500">
          Don't have an account yet?{" "}
          <Link to="signup" className="text-blue-500 hover:text-blue-700">
            Sign in here
          </Link>
        </div>
        <div className="text-center">
          {email} {password}
        </div>
      </div>
    </div>
  );
}
