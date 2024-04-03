import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    confirmedPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    const match =
      user.password === user.confirmedPassword ||
      user.confirmedPassword.length === 0;
    setPasswordsMatch(match);
  }, [user.password, user.confirmedPassword]);

  function onHandleChange(e) {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));

    if (id === "password" || id === "confirmedPassword") {
      setPasswordsMatch(
        user.password === user.confirmedPassword && user.confirmedPassword > 0
      );
    }
  }

  function onHandleSubmit() {
    setUser({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-14 bg-white rounded-lg shadow-xl space-y-6 max-w-2xl w-full mx-4">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Enter Your first and last Name
        </label>
        <div className="flex space-x-4">
          <input
            id="firstName"
            type="text"
            placeholder="first name"
            className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
            value={user.firstName}
            onChange={onHandleChange}
          />
          <input
            id="lastName"
            type="text"
            placeholder="last name"
            className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
            value={user.lastName}
            onChange={onHandleChange}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          Enter your email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@mail.com"
          className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.email}
          onChange={onHandleChange}
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
          placeholder="password"
          className="border-2 border-gray-300 bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.password}
          onChange={onHandleChange}
        />
        <label
          htmlFor="confirmedPassword"
          className="block text-sm font-semibold text-gray-700"
        >
          Confirm your password
        </label>
        <input
          id="confirmedPassword"
          type="password"
          placeholder="confirm password"
          className={`border-2 ${!passwordsMatch && user.confirmedPassword.length > 0 ? "border-red-500" : "border-gray-300"} bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500`}
          value={user.confirmedPassword}
          onChange={onHandleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={onHandleSubmit}
        >
          Register
        </button>
        <div className="text-center text-gray-500">
          Already have an account yet?{" "}
          <Link
            to=".."
            relative="path"
            className="text-blue-500 hover:text-blue-700"
          >
            Login in here
          </Link>
        </div>
      </div>
    </div>
  );
}
