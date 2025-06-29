import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { useNavigate } from "react-router-dom";
import LeftPannel from "../components/LeftPannel";
import RightPanel from "../components/RightPannel";
import { MessageCircle } from "lucide-react";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/user/connections`, {
        withCredentials: true,
      });
      setConnections(data.connections);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="grid md:grid-cols-[1fr_450px_1fr] min-h-[calc(100vh-5rem)]">
      {/* Left Panel */}
      <div className="hidden md:flex">
        <LeftPannel />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center w-full pt-4 bg-slate-50">
        <div className="px-4 w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-3">
            <h2 className="text-lg font-semibold">
              Connections ({connections.length})
            </h2>
            <button
              className="text-black hover:scale-95 transition-all duration-200 px-3 py-2 rounded-md"
              onClick={() => navigate("/connectionRequests")}
            >
              View Requests
            </button>
          </div>

          {/* Connection List */}
          <div className="flex flex-col items-center gap-2">
            {connections.length > 0 ? (
              connections.map((connection) => (
                <div
                  key={connection._id}
                  className="flex items-center justify-between w-full p-2 rounded-lg transition"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={connection.photoURL || "/defaultUser.png"}
                    alt="User"
                  />
                  <div className="flex-1 mx-3">
                    <p className="font-medium text-sm">
                      {connection.firstName + " " + connection.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                      {connection.about || "No about info"}
                    </p>
                  </div>
                  <button
                    className="text-gray-600 hover:text-blue-500 text-sm px-3 py-2 hover:bg-gray-100 duration-200 transition-all ease-out rounded"
                    title="Chat (coming soon)"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                No connections found
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden md:flex">
        <RightPanel
          title="Your Network"
          message={
            <>
              <p className="mb-3">
                These are{" "}
                <span className="text-blue-600 font-semibold">coders</span>{" "}
                you've successfully connected with.
              </p>
              <p>
                Start a{" "}
                <span className="text-green-600 font-semibold">
                  conversation
                </span>{" "}
                or explore their{" "}
                <span className="text-purple-600 font-semibold">profiles</span>{" "}
                to{" "}
                <span className="text-rose-600 font-semibold">collaborate</span>{" "}
                on exciting projects.
              </p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Connections;
