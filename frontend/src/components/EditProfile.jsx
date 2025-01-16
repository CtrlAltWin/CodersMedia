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
  FirstName,
  LastName,
  PhotoUrl,
  Gender,
  About,
  Skills,
}) => {
  return (
    <div className="flex justify-center mt-[58px]">
      <div className="card card-bordered bg-base-200 w-[380px] shadow-lg ">
        <div className="card-body items-center">
          <h2 className="card-title">Edit Profile</h2>

          {/* Placing Input Boxes */}

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <GenderInput Gender={Gender} setGender={setGender} />

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={PhotoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-3 w-[300px]"
              placeholder={Skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
            />
          </fieldset>

          <AboutInput PlaceHolder={"About"} setAbout={setAbout} About={About} />

          <div className="card-actions">
            <button className="btn btn-outline btn-success mt-4">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
