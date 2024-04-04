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
    setPasswordsMatch(user.password === user.confirmedPassword || user.confirmedPassword.length === 0);
  }, [user.password, user.confirmedPassword]);

  function onHandleChange(e) {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  }

  function onHandleSubmit(e) {
    e.preventDefault();
    setUser({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmedPassword: "",
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-pink-orange">
      <div className="p-14 bg-white rounded-lg shadow-xl space-y-6 max-w-2xl w-full mx-4">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Enter Your first and last Name
        </label>
        <div className="flex space-x-4">
          <input
            id="firstName"
            type="text"
            placeholder="first name"
            className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
            value={user.firstName}
            onChange={onHandleChange}
          />
          <input
            id="lastName"
            type="text"
            placeholder="last name"
            className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
            value={user.lastName}
            onChange={onHandleChange}
          />
        </div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Enter your email
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@mail.com"
          className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.email}
          onChange={onHandleChange}
        />
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Enter your password
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.password}
          onChange={onHandleChange}
        />
        <label
          htmlFor="confirmedPassword"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Confirm your password
        </label>
        <input
          id="confirmedPassword"
          type="password"
          placeholder="confirm password"
          className={`border-2 ${!passwordsMatch && user.confirmedPassword.length > 0 ? "border-red-500" : "border-light-pink-orange"} bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500`}
          value={user.confirmedPassword}
          onChange={onHandleChange}
        />
        <button
          type="submit"
          className="bg-pink-orange hover:bg-dark-pink-orange text-white font-bold py-2 px-4 rounded-lg w-full"
          onClick={onHandleSubmit}
        >
          Register
        </button>
        <div className="text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700"
          >
            Login in here
          </Link>
        </div>
      </div>
    </div>
  );
}
