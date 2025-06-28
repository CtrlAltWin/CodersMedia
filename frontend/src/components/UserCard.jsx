import React from "react";

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
  return (
    <div className="max-w-[440px] w-full h-[600px] border rounded overflow-hidden">
      <img
        className="w-full h-[400px] object-cover"
        src={PhotoUrl || "/defaultUser.png"}
        alt={`${FirstName} ${LastName}`}
      />

      <div className="px-6 py-5 space-y-4">
        {/* Name + Age/Gender */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold truncate">
            {FirstName} {LastName}
          </h2>
          <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full border">
            {Age} • {Gender}
          </span>
        </div>

        {/* About */}
        <div>
          <p className="text-base text-gray-700 line-clamp-2">{About}</p>
        </div>

        {/* Skills */}
        <div>
          <div className="flex flex-wrap gap-2">
            {Skills?.map((skill, idx) => (
              <span
                key={idx}
                className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
