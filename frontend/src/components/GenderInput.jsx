import React from "react";

const GenderInput = ({Gender, setGender}) => {
  return (
    <div>
      <input
        type="text"
        className="input input-bordered mt-3 w-[300px]"
        placeholder={Gender}
        list="browsers"
        onChange={(e) => setGender(e.target.value)}
      />
      <datalist id="browsers">
        <option value="male" />
        <option value="female" />
        <option value="others" />
      </datalist>
    </div>
  );
};

export default GenderInput;
