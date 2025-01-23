import React, { useState } from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../Utils/url";
import axios from "axios";
import { addUser } from "../Utils/userSlice";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState("");
  const [Gender, setGender] = useState("");
  const [Skills, setSkills] = useState("");
  const [About, setAbout] = useState("");
  const [showToast, setShowToast] = useState(false);
  if (!user) return <div></div>;
  const { firstName, lastName, emailId, skills, age, photoURL, about } = user;
  const skillsArray = Skills.split(",").map((skill) => skill.trim());
  const skillsString = skills.join(", ");
  const dispatch = useDispatch();
  const updateProfile = async () => {
    try {
      const newFirstName = FirstName.length > 0 ? FirstName : firstName;
      const newLastName = LastName.length > 0 ? LastName : lastName;
      const newAbout = About.length > 0 ? About : about;
      const newSkills =
        skillsArray.length === 1 && skillsArray[0] === ""
          ? skills
          : skillsArray;
      const newPhotoUrl = PhotoUrl.length > 0 ? PhotoUrl : photoURL;

      const edit = {
        firstName: newFirstName,
        lastName: newLastName,
        photo_URL: newPhotoUrl,
        about: newAbout,
        skills: newSkills,
      };

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
    <div className="flex flex-grow gap-6 w-screen justify-center">
      {showToast && (
        <div className="toast toast-center z-10">
          <div className="alert alert-success">
            <span>Profile updated successfully</span>
          </div>
        </div>
      )}
      <EditProfile
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPhotoUrl={setPhotoUrl}
        setGender={setGender}
        setAbout={setAbout}
        setSkills={setSkills}
        firstName={firstName}
        lastName={lastName}
        photoURL={photoURL}
        about={about}
        skills={skillsString}
        setShowToast={setShowToast}
        updateProfile={updateProfile}
      />
      <UserCard
        FirstName={FirstName.length === 0 ? firstName : FirstName}
        LastName={LastName.length === 0 ? lastName : LastName}
        PhotoUrl={PhotoUrl.length === 0 ? photoURL : PhotoUrl}
        About={About.length === 0 ? about : About}
        Skills={Skills.length === 0 ? skills : skillsArray}
      />
    </div>
  );
};

export default Profile;
