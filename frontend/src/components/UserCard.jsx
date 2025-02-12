import React from "react";
import { baseUrl } from "../Utils/url";
import { removeUserFromFeed } from "../Utils/feedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const UserCard = ({
  Id,
  FirstName,
  LastName,
  Skills,
  About,
  PhotoUrl,
  Age,
  Gender,
}) => {
  const dispatch = useDispatch();
  const skillsArr = Skills.map((skill, i) => {
    return i < Skills.length - 1 ? skill + ", " : skill;
  });
  return (
    <div className="card bg-base-200 h-[550px] w-[330px] shadow-xl border">
      <figure>
        <img
          className="h-[300px] w-[395px] object-cover"
          src={PhotoUrl || "/defaultUser.png"}
          alt="User"
        />
      </figure>
      <div className="card-body items-center object-cover">
        <h2 className="text-2xl text-center font-bold w-auto overflow-hidden text-ellipsis">
          {FirstName + " " + LastName}
        </h2>
        <h4 className="text-xl text-center font-semibold w-auto overflow-hidden text-ellipsis">
          {Age + ", " + Gender}
        </h4>
        <p className="text-2xl text-center text-gray-500 mt-2 w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {About}
        </p>
        <p className="text-xl text-center text-gray-500 mt-2 font-thin  w-full whitespace-nowrap overflow-hidden text-ellipsis">
          {skillsArr}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
