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
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] py-6 px-4 bg-base-100">
      <div className="bg-base-200 opacity-90 shadow-md rounded-xl p-5 w-full max-w-2xl border">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h2 className="text-lg font-semibold">
            Connections ({connections?.length})
          </h2>
          <button
            className="btn btn-primary text-white px-3 py-1 rounded-md shadow"
            onClick={() => navigate("/connectionRequests")}
          >
            View Requests
          </button>
        </div>

        {/* Connection List */}
        <div className="flex flex-col items-center gap-3 overflow-y-auto max-h-[65vh]">
          {connections.length > 0 ? (
            connections.map((connection) => (
              <div
                key={connection._id}
                className="flex items-center justify-between bg-base-300 w-full max-w-md p-2 rounded-lg shadow-sm border transition-all hover:bg-base-200"
              >
                {/* Profile Image */}
                <img
                  className="w-10 h-10 rounded-full object-cover border"
                  src={connection.photoURL || "/defaultUser.png"}
                  alt="User"
                />
                {/* Name and About */}
                <div className="flex-1 mx-3">
                  <p className="font-medium text-sm">
                    {connection.firstName + " " + connection.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {connection.about || "No about info"}
                  </p>
                </div>
                {/* Chat Icon- To be implemented later */}
                <button className="text-gray-500 hover:text-primary transition">
                  💬
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
  );
};

export default Connections;
