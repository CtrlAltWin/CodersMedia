import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      if (isLogin) {
        const res = await axios.post(
          backendUrl + "/login",
          { emailId: formData.email, password: formData.password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/Feed");
      } else {
        await axios.post(backendUrl + "/signup", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.email,
          password: formData.password,
          age: formData.age,
          gender: formData.gender,
        });

        const loginRes = await axios.post(
          backendUrl + "/login",
          { emailId: formData.email, password: formData.password },
          { withCredentials: true }
        );

        dispatch(addUser(loginRes.data));
        navigate("/editProfile");
      }
    } catch (err) {
      setErrorMsg(err.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] px-4 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col w-full max-w-[440px] justify-center gap-6 px-6 py-8 border rounded-md shadow"
      >
        <div className="text-center border-b pb-2">
          <h1 className="font-bold text-2xl">CodersMedia</h1>
          <p className="text-gray-600 text-sm">Discover. Connect. Code Together.</p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-600">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1 px-1 text-gray-600"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1 px-1 text-gray-600"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 px-1 text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 px-1 text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLogin && (
          <>
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium mb-1 px-1 text-gray-600"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium mb-1 px-1 text-gray-600"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </div>
          </>
        )}

        {ErrorMsg && <p className="text-red-500 text-sm">{ErrorMsg}</p>}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 mt-6 text-sm transition-all duration-200 hover:scale-105"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {isLoading && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}

        <p className="text-sm text-center text-gray-600 mt-4">
          {isLogin ? "New user?" : "Already have an account?"}{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
