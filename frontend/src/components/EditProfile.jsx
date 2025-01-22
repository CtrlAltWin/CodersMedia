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
    <div className="flex justify-center mt-[74px]">
      <div className="card bg-base-200 shadow-lg h-[590px] w-[400px]">
        <div className="card-body items-center">
          {/* Placing Input Boxes */}
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-2 w-[300px]"
              placeholder={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-2 w-[300px]"
              placeholder={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>

          <GenderInput Gender={Gender} setGender={setGender} />

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-2 w-[300px]"
              placeholder={PhotoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
            />
          </fieldset>

          <fieldset className="fieldset">
            <input
              type="text"
              className="input input-bordered mt-2 w-[300px]"
              placeholder={Skills}
              onChange={(e) => {
                setSkills(e.target.value);
              }}
            />
          </fieldset>

          <AboutInput PlaceHolder={"About"} setAbout={setAbout} About={About} />

          <div className="card-actions">
            <button className="btn btn-outline btn-success mt-2">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
