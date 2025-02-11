import React, { useState } from "react";
import themeHandler from "../Utils/themeHandler";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../Utils/url";
import { removeUser } from "../Utils/userSlice";

const Navbar = () => {
  const [CurrentTheme, setCurrentTheme] = useState("dark");
  document
    .getElementsByTagName("html")[0]
    .setAttribute("data-theme", CurrentTheme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        baseUrl + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log("Error: " + res);
    }
  };

  const user = useSelector((store) => store.user);

  return (
    <div className="navbar bg-base-100 border-b h-[4rem] px-4">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Coder's Media</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user && (
            <li className="hidden sm:block">
              <Link to={"/profile"}>Profile</Link>
            </li>
          )}
          {user && (
            <li className="hidden sm:block">
              <Link to="/feed">Feed</Link>
            </li>
          )}
          {user && (
            <li className="hidden sm:block">
              <Link to="/connections">Connectons</Link>
            </li>
          )}
          <li>
            <details className="z-10">
              <summary className="font-bold">
                {user ? (
                  <div>{"Hello, " + user.firstName}</div>
                ) : (
                  <div>Hello, User</div>
                )}
              </summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li className="sm:hidden">
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li className="sm:hidden">
                  <Link to="/feed">Feed</Link>
                </li>
                <li className="sm:hidden">
                  <Link to="/connections">Connectons</Link>
                </li>

                {user && (
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                )}
                {/* <li>
                  <button
                    onClick={() => themeHandler(CurrentTheme, setCurrentTheme)}
                  >
                    {CurrentTheme == "cupcake" ? "Dark Mode" : "Light Mode"}
                  </button>
                </li> */}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
