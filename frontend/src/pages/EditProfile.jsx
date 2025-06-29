import React from "react";
import LeftPannel from "../components/LeftPannel";
import RightPanel from "../components/RightPannel";
import EditProfileForm from "../components/EditProfileForm";

const EditProfile = () => {
  return (
    <div className="grid md:grid-cols-[1fr_450px_1fr] h-[calc(100vh-5rem)]">
      {/* Left Branding Panel */}
      <div className="hidden md:flex">
        <LeftPannel />
      </div>

      {/* Center Form */}
      <div className="flex justify-center py-2">
        <EditProfileForm />
      </div>

      {/* Right Info Panel */}
      <div className="hidden md:flex">
        <RightPanel
          title="Keep Your Profile Updated"
          message={
            <>
              <p className="mb-3">
                A{" "}
                <span className="text-blue-600 font-medium">
                  well-filled profile
                </span>{" "}
                increases your chances of{" "}
                <span className="text-purple-600 font-medium">
                  meaningful connections
                </span>
                .
              </p>
              <p>
                Add your{" "}
                <span className="text-green-600 font-medium">
                  latest skills
                </span>{" "}
                and a{" "}
                <span className="text-yellow-600 font-medium">short bio</span>{" "}
                to let others know what you're up to.
              </p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default EditProfile;
