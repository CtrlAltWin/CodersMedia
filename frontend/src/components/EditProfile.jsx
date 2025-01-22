import React from "react";
import TextInput from "./TextInput";
import GenderInput from "./GenderInput";
import { AboutInput } from "./AboutInput";

const EditProfile = ({
  setFirstName,
  setLastName,
  setPhotoUrl,
  setSkills,
  setGender,
  setAbout,
  firstName,
  lastName,
  photoURL,
  about,
  skills,
}) => {
  return (
    <div className="flex justify-center mt-[76px]">
      <div className="card bg-base-200 border-1 shadow-xl h-[585px] w-[400px]">
        <div className="card-body items-center">
          {/* Placing Input Boxes */}
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={photoURL}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
            />
          </fieldset>

          <AboutInput PlaceHolder={"About"} setAbout={setAbout} about={about} />

          <div className="card-actions">
            <button className="btn btn-outline btn-success mt-3">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
