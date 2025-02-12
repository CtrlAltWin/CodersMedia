import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils/url";

const AuthPage = () => {
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
    try {
      if (isLogin) {
        // Login request
        const res = await axios.post(
          baseUrl + "/login",
          { emailId: formData.email, password: formData.password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        navigate("/Feed");
      } else {
        // Signup request
        await axios.post(baseUrl + "/signup", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          emailId: formData.email,
          password: formData.password,
          age: formData.age,
          gender: formData.gender,
        });

        // Auto login after successful signup
        const loginRes = await axios.post(
          baseUrl + "/login",
          { emailId: formData.email, password: formData.password },
          { withCredentials: true }
        );

        dispatch(addUser(loginRes.data));
        navigate("/editProfile");
      }
    } catch (err) {
      setErrorMsg(err.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center p-8">
      <div
        className={`card border bg-base-200 w-[380px] shadow-xl  transition-all duration-300 ${
          isLogin ? "h-[500px]" : "h-[870px]"
        }`}
      >
        <div className="card-body items-center">
          <h2 className="card-title mt-1 mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

          {/* Sign-Up Fields */}
          {!isLogin && (
            <>
              <fieldset className="fieldset w-full">
                <label className="label text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="label text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="input input-bordered w-full"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </fieldset>
            </>
          )}

          {/* Email Field */}
          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>

          {/* Password Field */}
          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </fieldset>

          {/* Additional Sign-Up Fields */}
          {!isLogin && (
            <>
              <fieldset className="fieldset w-full">
                <label className="label text-sm font-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  className="input input-bordered w-full"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </fieldset>

              <fieldset className="fieldset w-full">
                <label className="label text-sm font-semibold">Gender</label>
                <select
                  name="gender"
                  className="select select-bordered w-full"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </fieldset>
            </>
          )}

          <h3 className="text-red-500 text-center">{ErrorMsg}</h3>

          {/* Submit Button */}
          <div className="card-actions">
            <button className="btn btn-outline btn-success my-4" onClick={handleSubmit}>
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          {/* Toggle Login/Sign Up */}
          <p className="my-4">
            {isLogin ? "New User?" : "Already have an account?"}{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Login"}
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;




