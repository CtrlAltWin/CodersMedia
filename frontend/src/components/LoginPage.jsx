import React, { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils/url";

const LoginPage = () => {
  const [Email, setEmail] = useState("raunakkumar1611@gmail.com");
  const [Password, setPassword] = useState("Raunak@1611");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/login",
        { emailId: Email, password: Password },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      navigate("/Feed");
    } catch (err) {
      console.log("Error: " + err);
    }
  };
  return (
    <div className="flex justify-center h-[calc(100vw-4rem)] py-12">
      <div className="card card-bordered bg-base-200 w-[380px] h-[500px] shadow-xl border">
        <div className="card-body items-center">
          <h2 className="card-title mt-1 mb-4">Login</h2>

          {/* Email Input Field */}
          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Email</label>
            <EmailInput setEmail={setEmail} />
          </fieldset>

          {/* Password Input Field */}
          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Password</label>
            <PasswordInput setPassword={setPassword} />
          </fieldset>

          <div className="card-actions">
            <button
              className="btn btn-outline btn-success my-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <p className="my-4">
            New User?{" "}
            <span className="text-blue-500 cursor-pointer">Sign Up</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
