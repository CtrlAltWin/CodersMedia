import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { removeUser } from "../Utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  return (
    <nav className="w-full min-h-16 bg-white px-6 py-4">
      <div className="grid grid-cols-[1fr_1fr] max-w-[1350px] h-full mx-auto">
        <Link to="/" className="inline-flex items-center font-bold text-xl">
          Coder's Media
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-end items-center gap-6 text-gray-700 font-medium">
          {user && (
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
          )}
          {user && (
            <Link to="/feed" className="hover:underline">
              Feed
            </Link>
          )}
          {user && (
            <Link to="/connections" className="hover:underline">
              Connections
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden justify-end items-center">
          <button onClick={toggleMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-start gap-3 px-6 py-4 bg-white shadow-md text-gray-700 font-medium">
          {user && (
            <Link to="/profile" onClick={toggleMenu}>
              Profile
            </Link>
          )}
          {user && (
            <Link to="/feed" onClick={toggleMenu}>
              Feed
            </Link>
          )}
          {user && (
            <Link to="/connections" onClick={toggleMenu}>
              Connections
            </Link>
          )}
          {user && (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
