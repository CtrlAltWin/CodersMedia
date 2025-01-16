import React from "react";

export const AboutInput = ({ setAbout, About}) => {
  return (
    <label className="form-control w-[300px] mt-3">
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder={About}
        onChange={(e)=> {
          setAbout(e.target.value);
        }}
      ></textarea>
    </label>
  );
};
