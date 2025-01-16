import React from "react";

const UserCard = ({ FirstName, LastName, Gender,  Skills, About, PhotoUrl }) => {
  return (
    <div className="card bg-base-200 h-[600px] w-[400px] shadow-xl mt-[70px]">
      <figure>
        <img
          className=" h-[320px]"
          src={PhotoUrl}
      
        />
      </figure>
      <div className="card-body items-center object-cover">
        <h2 className="card-title text-4xl font-bold">
          {FirstName + " " + LastName+" ("+Gender+")"}
        </h2>
        <p className="text-2xl text-gray-500 mt-2  w-72 whitespace-nowrap text-center overflow-hidden text-ellipsis">
          {About}
        </p>
        <p className="text-xl text-gray-500 mt-2 font-thin  w-72 whitespace-nowrap text-center overflow-hidden text-ellipsis">
          {Skills}
        </p>
        <div className="card-actions justify-between mt-4">
          <button className="btn btn-outline btn-secondary w-20">Nooo!</button>
          <button className="btn btn-outline btn-primary w-20">Yesss!</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
