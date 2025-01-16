import React, { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils/url";

const LoginPage = () => {
  const [Email, setEmail] = useState("rohit@gmail.com");
  const [Password, setPassword] = useState("Rohit@12");
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
    <div className="flex justify-center">
      <div className="card card-bordered bg-base-200 w-[380px] shadow-xl mt-[150px]">
        <div className="card-body items-center">
          <h2 className="card-title mt-1 mb-4">Login</h2>
          <EmailInput setEmail={setEmail} />
          <PasswordInput setPassword={setPassword} />
          <div className="card-actions">
            <button
              className="btn btn-outline btn-success my-4"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <p className="my-4">New User? SignUp.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
