import React from "react";
import ConnectionRequests from "./ConnectionRequests";
import Connections from "./Connections";
const ConnectionsPage = () => {
  return (
    <div className="mt-28 flex flex-col gap-10 items-center ">
      <ConnectionRequests />
      <Connections/>
    </div>
  );
};

export default ConnectionsPage;
