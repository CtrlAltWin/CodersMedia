import React from "react";
import { baseUrl } from "../Utils/url";
import { removeUserFromFeed } from "../Utils/feedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const UserCard = ({ Id, FirstName, LastName, Skills, About, PhotoUrl }) => {
  const dispatch = useDispatch();
  const handleClick = async (status, id) => {
    await axios.post(
      baseUrl + "/request/send/" + status + "/" + id,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeUserFromFeed(id));
  };
  const skillsArr = Skills.map((skill, i) => {
    return i < Skills.length - 1 ? skill + ", " : skill;
  });
  return (
    <div className="card bg-base-200 h-[580px] w-[400px] shadow-xl mt-[80px]">
      <figure>
        <img className="h-[300px]  w-[395px] object-cover" src={PhotoUrl} />
      </figure>
      <div className="card-body items-center object-cover">
        <h2 className="text-2xl text-center font-bold w-72 overflow-hidden text-ellipsis">
          {FirstName + " " + LastName}
        </h2>
        <p className="text-2xl text-center text-gray-500 mt-2 w-72 whitespace-nowrap overflow-hidden text-ellipsis">
          {About}
        </p>
        <p className="text-xl text-center text-gray-500 mt-2 font-thin  w-72 whitespace-nowrap overflow-hidden text-ellipsis">
          {skillsArr}
        </p>
        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-secondary w-20"
            onClick={() => {
              handleClick("interested", Id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-primary w-20"
            onClick={() => {
              handleClick("ignored", Id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
