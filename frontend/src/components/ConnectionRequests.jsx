import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { useNavigate } from "react-router-dom";

const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/user/request/recieved/pending`,
        {
          withCredentials: true,
        }
      );
      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching connection requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (requestId, action) => {
    try {
      await axios.post(
        `${baseUrl}/request/review/${action}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setRequests((prev) => prev.filter((req) => req.requestId !== requestId));
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] py-6 px-4 bg-base-100">
      <div className="bg-base-200 opacity-90 shadow-md rounded-xl p-5 w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-3">
          <h2 className="text-lg font-semibold">
            Connection Requests ({requests?.length})
          </h2>
          <button
            className="btn btn-primary text-white px-3 py-1 rounded-md shadow"
            onClick={() => navigate("/connections")}
          >
            View Connections
          </button>
        </div>

        {/* Request List */}
        <div className="flex flex-col items-center gap-3 overflow-y-auto max-h-[65vh]">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.requestId}
                className="flex items-center justify-between bg-base-300 w-full max-w-md p-2 rounded-lg shadow-sm border transition-all hover:bg-base-200"
              >
                {/* Profile Image */}
                <img
                  className="w-10 h-10 rounded-full object-cover border"
                  src={request.sender.photoURL || "/defaultUser.png"}
                  alt="User"
                />
                {/* Name and About */}
                <div className="flex-1 mx-3">
                  <p className="font-medium text-sm">
                    {request.sender.firstName + " " + request.sender.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[150px]">
                    {request.sender.about || "No about info"}
                  </p>
                </div>
                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="btn btn-error btn-xs text-white hover:bg-red-700 transition"
                    onClick={() => handleRequest(request.requestId, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary btn-xs text-white hover:bg-blue-700 transition"
                    onClick={() => handleRequest(request.requestId, "accepted")}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center w-full">
              No pending requests
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionRequests;

