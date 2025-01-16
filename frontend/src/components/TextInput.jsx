import React from "react";

const TextInput = ({ PlaceHolder }) => {
  return (
    <fieldset className="fieldset">
      <input
        type="text"
        className="input input-bordered mt-3 w-[300px]"
        placeholder={PlaceHolder}
      />
    </fieldset>
  );
};

export default TextInput;
