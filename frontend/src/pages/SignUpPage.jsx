import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function RegisterPage() {
  const { signup } = useContext(UserContext)
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
    confirmedPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState("");

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

  async function onHandleSubmit(e) {
    e.preventDefault();
    if (passwordsMatch && user.password === user.confirmedPassword) {
      const { confirmedPassword, ...userData } = user;
  
      try {
        const data = await signup(userData);
        if (data.status === 200) {
          navigate("/login");
          console.log(data);
        } else {
          switch (data.status) {
            case 400:
              setError(data.error || "User already exists or request body is not valid.");
              break;
            case 401:
              setError("Email or password is missing.");
              break;
            case 402:
              setError(data.error || "Invalid email format.");
              break;
            default:
              setError("An unknown error occurred.");
              break;
          }
          console.log("Signup failed:", data);
        }
      } catch (error) {
        console.error("Signup Error:", error);
        setError("Signup failed. Please try again.");
      }
    } else {
      setError("Passwords do not match.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-light-pink-orange">
      <div className="p-14 bg-white rounded-lg shadow-xl space-y-6 max-w-2xl w-full mx-4">
        <label
          htmlFor="userName"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Enter your user name
        </label>
        <input
          id="userName"
          type="text"
          placeholder="Enter your user name"
          className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.userName}
          onChange={onHandleChange}
        />
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
          htmlFor="phoneNumber"
          className="block text-sm font-semibold text-words-pink-orange"
        >
          Enter your phone number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="Your phone number"
          className="border-2 border-light-pink-orange bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500"
          value={user.phoneNumber}
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
          className={`border-2 ${!passwordsMatch && user.confirmedPassword.length > 0 ? "border-red-700" : "border-light-pink-orange"} bg-gray-50 h-10 px-5 rounded-lg text-sm focus:outline-none w-full placeholder-gray-500`}
          value={user.confirmedPassword}
          onChange={onHandleChange}
        />
        {(!passwordsMatch && user.confirmedPassword.length > 0) && <p className="text-red-700">Passwords must match</p>}
        {error && <p className="text-red-700">{error}</p>}
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
