import React from "react";

export const AboutInput = ({ setAbout, about }) => {
  return (
    <label className="form-control w-[300px]">
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={about}
        onChange={(e) => {
          setAbout(e.target.value);
        }}
      ></textarea>
    </label>
  );
};
