import React from "react";
import ConnectionRequests from "./ConnectionRequests";
import Connections from "./Connections";
import { useNavigate } from "react-router-dom";
const ConnectionsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center h-[calc(100vh-4rem)] pb-8">
      <Connections />
    </div>
  );
};

export default ConnectionsPage;
