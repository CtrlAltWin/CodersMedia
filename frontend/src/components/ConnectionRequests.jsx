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
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] py-8 px-4 bg-base-100">
      <div className="bg-base-200 opacity-80 shadow-lg rounded-2xl p-6 w-full max-w-3xl ">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-semibold">
            Connection Requests ({requests?.length})
          </h2>
          <button
            className="btn btn-primary text-white px-4 py-2 rounded-lg shadow"
            onClick={() => navigate("/connections")}
          >
            View Connections
          </button>
        </div>

        {/* Request List */}
        <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-[70vh]">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div
                key={request.requestId}
                className="flex items-center bg-base-300 gap-4 p-3 rounded-full shadow-sm transition border w-full max-w-md"
              >
                {/* Profile Image */}
                <img
                  className="w-12 h-12 rounded-full object-cover border"
                  src={request.sender.photoURL || "/defaultUser.png"}
                  alt="User"
                />
                {/* Name */}
                <p className="font-medium flex-1">
                  {request.sender.firstName + " " + request.sender.lastName}
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    className="btn btn-error btn-sm text-white hover:bg-red-700 transition"
                    onClick={() => handleRequest(request.requestId, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary btn-sm text-white hover:bg-blue-700 transition"
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
