import React, { useState } from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../Utils/url";
import axios from "axios";
import { addUser } from "../Utils/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  if (!user) return <div></div>;
  const { firstName, lastName, emailId, skills, age, photoURL, about } = user;
  const skillsString = skills.join(", ");
  const updateProfile = async () => {
    try {
      const res = await axios.patch(baseUrl + "/profile/Edit", edit, {
        withCredentials: true,
      });
      setShowToast(true);
      dispatch;
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center h-[calc(100vh-4rem)] w-full py-8">
      <UserCard
        FirstName={firstName}
        LastName={lastName}
        PhotoUrl={photoURL}
        About={about}
        Skills={skills}
      />
      <button
        className="btn btn-primary mt-6 p-4"
        onClick={() => navigate("/editProfile")}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
