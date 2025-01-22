import React, { useState } from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState("");
  const [Gender, setGender] = useState("");
  const [Skills, setSkills] = useState("");
  const [About, setAbout] = useState("");
  if (!user) return <div></div>;
  const { firstName, lastName, emailId, skills, age, photoURL, about } = user;
  const skillsArray = Skills.split(",").map((skill) => skill.trim());
  const skillsString = skills.join(", ");
  return (
    <div className="flex flex-grow gap-6 w-screen justify-center">
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
