import React from "react";
import ConnectionRequests from "./ConnectionRequests";
import Connections from "./Connections";
import { useNavigate } from "react-router-dom";
const ConnectionsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-28 flex flex-col gap-10 items-center ">
      <button
        className="btn btn-primary w-3/12 font-mono"
        onClick={() => {
          navigate("/connectionRequests");
        }}
      >
        Requests
      </button>
      <Connections />
    </div>
  );
};

export default ConnectionsPage;
