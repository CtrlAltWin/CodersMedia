import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { addUser } from "../utils/userSlice";
import { Save } from "lucide-react";
import { FlashOnRounded } from "@mui/icons-material";
import Spinner from "./Spinner";

const EditProfileForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [ShowToast, setShowToast] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhotoUrl, setPhotoUrl] = useState("");
  const [Skills, setSkills] = useState("");
  const [About, setAbout] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  const user = useSelector((store) => store.user);
  const { firstName, lastName, skills, photoURL, about } = user || {};

  const handleEditProfile = async () => {
    setIsLoading(true);
    const skillsArray = Skills.split(",").map((skill) => skill.trim());
    const newFirstName = FirstName || firstName;
    const newLastName = LastName || lastName;
    const newAbout = About || about;
    const newSkills =
      skillsArray.length === 1 && skillsArray[0] === "" ? skills : skillsArray;
    const newPhotoUrl = PhotoUrl || photoURL;

    const edit = {
      firstName: newFirstName,
      lastName: newLastName,
      photoURL: newPhotoUrl,
      about: newAbout,
      skills: newSkills,
    };

    try {
      await axios.patch(backendUrl + "/profile/Edit", edit, {
        withCredentials: true,
      });

      dispatch(addUser(edit));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setErrMsg(err.response?.data || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-[440px] justify-center gap-6 px-6 border"
      onSubmit={(e) => {
        e.preventDefault();
        handleEditProfile();
      }}
    >
      <h2 className="text-2xl font-semibold text-center text-slate-600">
        Edit Profile
      </h2>

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium mb-1 px-1 text-gray-600"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          placeholder={firstName}
          className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFirstName(e.target.value)}
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
          type="text"
          placeholder={lastName}
          className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="photoUrl"
          className="block text-sm font-medium mb-1 px-1 text-gray-600"
        >
          Photo URL
        </label>
        <input
          id="photoUrl"
          type="text"
          placeholder={photoURL}
          className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="skills"
          className="block text-sm font-medium mb-1 px-1 text-gray-600"
        >
          Skills (comma-separated)
        </label>
        <input
          id="skills"
          type="text"
          placeholder={skills}
          className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="about"
          className="block text-sm font-medium mb-1 px-1 text-gray-600"
        >
          About
        </label>
        <textarea
          id="about"
          placeholder={about}
          value={About}
          rows={4}
          className="w-full px-3 py-2 border text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      {ErrMsg && <p className="text-red-500 text-sm">{ErrMsg}</p>}

      <button
        type="submit"
        className="flex group gap-4 justify-center w-full text-gray-200 py-2 bg-gray-800 transition-all duration-200 hover:scale-105"
      >
        <p> Save Changes</p>
        <Save className="group-hover:rotate-12 transition-all duration-200" />
      </button>

      {/* {isLoading && (
        <div className="mx-auto">
          <Spinner />
        </div>
      )} */}

      {ShowToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow">
            Profile updated successfully!
          </div>
        </div>
      )}
    </form>
  );
};

export default EditProfileForm;
