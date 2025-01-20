import React, { useEffect, useState } from "react";
import { baseUrl } from "../Utils/url";
import axios from "axios";

const Connections = () => {
  const [Connections, setConnections] = useState(null);
  const [Show, setShow] = useState(true);
  const fetch = async () => {
    const data = await axios.get(baseUrl + "/user/connections", {
      withCredentials: true,
    });
    setConnections(data.data.connections);
  };
  useEffect(() => {
    fetch();
  }, []);

  if (Connections === null) return <div></div>;

  return (
    <div className="flex flex-col items-center w-4/12 gap-6 bg-base-200 p-4 rounded-3xl">
      {/* heading */}
      <h2
        className="font-extralight text-lg p-2"
        onClick={() => {
          setShow(Show === true ? false : true);
        }}
      >
        {"Connection (" + Connections?.length + ")"}
      </h2>

      {/* content */}

      {Show && (
        <div className="flex flex-col gap-4">
          {Connections.map((Connection) => {
            return (
              <div key={Connection._id} className="flex gap-2">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp5IMvU5mzUNUAVtUPVexkzgt3cDPUE6113Q&s"
                  alt=""
                />
                <p className="p-2 font-extralight">
                  {Connection.firstName + " " + Connection.lastName}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;
