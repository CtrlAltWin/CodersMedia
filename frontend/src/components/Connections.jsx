import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] py-8 px-4 bg-base-100">
      <div className="bg-base-200 opacity-80 shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">
            Connections ({connections?.length})
          </h2>
          <button
            className="btn btn-primary text-white px-4 py-2 rounded-lg shadow"
            onClick={() => navigate("/connectionRequests")}
          >
            View Requests
          </button>
        </div>

        {/* Connection List */}
        <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-[70vh]">
          {connections.length > 0 ? (
            connections.map((connection) => (
              <div
                key={connection._id}
                className="flex bg-base-300 items-center gap-4 p-3 rounded-xl shadow-sm transition w-full border max-w-md"
              >
                {/* Profile Image */}
                <img
                  className="w-12 h-12 rounded-full object-cover border"
                  src={connection.photoURL || "/defaultUser.png"}
                  alt="User"
                />
                {/* Name */}
                <p className="font-medium flex-1">
                  {connection.firstName + " " + connection.lastName}
                </p>
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
  );
};

export default Connections;
