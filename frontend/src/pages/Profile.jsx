import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LeftPannel from "../components/LeftPannel";
import RightPanel from "../components/RightPannel";
import UserCard from "../components/UserCard";
import { Edit } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  if (!user) return <div className="text-center py-10">Loading...</div>;

  const { firstName, lastName, emailId, skills, age, photoURL, about, gender } =
    user;

  return (
    <div className="grid md:grid-cols-[1fr_450px_1fr] min-h-[calc(100vh-5rem)]">
      {/* Left Branding */}
      <div className="hidden md:flex">
        <LeftPannel />
      </div>

      {/* Center Content: Profile Display and Edit Button */}
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <UserCard
          FirstName={firstName}
          LastName={lastName}
          PhotoUrl={photoURL}
          About={about}
          Skills={skills}
          Age={age}
          Gender={gender}
        />
        <button
          className="flex group justify-center items-center text-sm gap-4 px-6 py-[10px] hover:bg-gray-100 transition-all duration-200 rounded"
          onClick={() => navigate("/editProfile")}
        >
          <p className="font-semibold">Edit Profile</p>
          <Edit className="group-hover:rotate-12 transition-all duration-200 ease-out" />
        </button>
      </div>

      {/* Right Info Panel */}
      <div className="hidden md:flex">
        <RightPanel
          title="Your Profile"
          message={
            <>
              <p className="mb-3">
                This is your{" "}
                <span className="text-blue-600 font-medium">
                  public profile
                </span>{" "}
                — visible to other developers on the platform.
              </p>
              <p>
                Keep your{" "}
                <span className="font-medium text-purple-600">skills</span> and{" "}
                <span className="font-medium text-purple-600">
                  about section
                </span>{" "}
                up to date to get{" "}
                <span className="text-emerald-600 font-medium">
                  better connections
                </span>
                .
              </p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Profile;
