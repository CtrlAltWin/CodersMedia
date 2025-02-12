import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { addUser } from "../Utils/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
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
    const skillsArray = Skills.split(",").map((skill) => skill.trim());
    const newFirstName = FirstName.length > 0 ? FirstName : firstName;
    const newLastName = LastName.length > 0 ? LastName : lastName;
    const newAbout = About.length > 0 ? About : about;
    const newSkills =
      skillsArray.length === 1 && skillsArray[0] === "" ? skills : skillsArray;
    const newPhotoUrl = PhotoUrl.length > 0 ? PhotoUrl : photoURL;

    const edit = {
      firstName: newFirstName,
      lastName: newLastName,
      photoURL: newPhotoUrl,
      about: newAbout,
      skills: newSkills,
    };

    try {
      await axios.patch(baseUrl + "/profile/Edit", edit, {
        withCredentials: true,
      });

      dispatch(addUser(edit));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      setErrMsg(err.response.data);
    }
  };

  return (
    <div className="flex justify-center h-[calc(100vh-4rem)] p-6">
      {/* Toast Notification */}
      {ShowToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="card bg-base-200 border-1 shadow-xl h-[640px] w-[330px] border">
        <div className="card-body items-center">
          <h2 className="card-title">Edit Profile</h2>

          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">First Name</label>
            <input
              type="text"
              className="input input-bordered w-[300px]"
              placeholder={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-[300px]"
              placeholder={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-[300px]"
              placeholder={photoURL}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">Skills</label>
            <input
              type="text"
              className="input input-bordered w-[300px]"
              placeholder={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset w-full">
            <label className="label text-sm font-semibold">About</label>
            <textarea
              className="textarea textarea-bordered w-[300px] h-24"
              placeholder={about}
              value={About}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

          <div className="card-actions">
            <button
              className="btn btn-outline btn-success"
              onClick={() => {
                try {
                  handleEditProfile();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
