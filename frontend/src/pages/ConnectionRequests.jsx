import React, { useEffect, useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { useNavigate } from "react-router-dom";
import LeftPannel from "../components/LeftPannel";
import RightPanel from "../components/RightPannel";
import { Check, X } from "lucide-react";
const ConnectionRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/user/request/recieved/pending`,
        { withCredentials: true }
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
        `${backendUrl}/request/review/${action}/${requestId}`,
        {},
        { withCredentials: true }
      );
      setRequests((prev) => prev.filter((req) => req.requestId !== requestId));
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

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
              Connection Requests ({requests.length})
            </h2>
            <button
              className="text-black hover:scale-95 transition-all duration-200 px-3 py-2 rounded-md"
              onClick={() => navigate("/connections")}
            >
              View Connections
            </button>
          </div>

          {/* Requests List */}
          <div className="flex flex-col items-center gap-2">
            {requests.length > 0 ? (
              requests.map((request) => (
                <div
                  key={request.requestId}
                  className="flex items-center justify-between w-full p-2 rounded-lg transition"
                >
                  {/* Profile Image */}
                  <img
                    className="w-10 h-10 rounded-full object-cover border"
                    src={request.sender.photoURL || "/defaultUser.png"}
                    alt="User"
                  />
                  {/* Name & About */}
                  <div className="flex-1 mx-3">
                    <p className="font-medium text-sm">
                      {request.sender.firstName + " " + request.sender.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                      {request.sender.about || "No about info"}
                    </p>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      className="text-sm px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-500 duration-200 transition-all ease-out rounded"
                      onClick={() =>
                        handleRequest(request.requestId, "rejected")
                      }
                    >
                      <X />
                    </button>
                    <button
                      className="text-sm px-2 py-1 text-gray-600 hover:bg-gray-100 hover:text-blue-500 duration-200 transition-all ease-out rounded"
                      onClick={() =>
                        handleRequest(request.requestId, "accepted")
                      }
                    >
                      <Check />
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

      {/* Right Panel */}
      <div className="hidden md:flex">
        <RightPanel
          title="Manage Requests"
          message={
            <>
              <p className="mb-3">
                <span className="text-green-600 font-medium">Accept</span> to{" "}
                <span className="text-blue-600 font-medium">connect</span> and{" "}
                <span className="text-rose-600 font-medium">collaborate</span>{" "}
                with other{" "}
                <span className="text-purple-600 font-medium">coders</span>.
              </p>
              <p>
                <span className="text-red-500 font-medium">Decline</span> if
                you're not interested right now. You can always{" "}
                <span className="text-blue-600 font-medium">connect</span>{" "}
                later.
              </p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default ConnectionRequests;
