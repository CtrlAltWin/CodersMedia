import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Utils/url";

const ConnectionRequests = () => {
  const [Requests, setRequests] = useState(null);
  const [Show, setShow] = useState(true);

  const fetch = async () => {
    const connectionRequests = await axios.get(
      baseUrl + "/user/request/recieved/pending",
      {
        withCredentials: true,
      }
    );
    setRequests(connectionRequests.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (Requests === null) return <div></div>;

  return (
    <div className="flex flex-col items-center w-5/12 gap-6 bg-base-200 p-4 rounded-3xl">
      {/* heading */}
      <h2
        className="font-bold text-lg"
        onClick={() => {
          setShow(Show === true ? false : true)
        }}
      >
        {"connection requests (" + Requests.message + ")"};
      </h2>

      {/* content */}

      {Show && (
        <div className="flex flex-col gap-3">
          {Requests.requests.map((Request) => {
            return (
              <div key={Request.requestId} className="flex gap-2">
                <img
                  className="w-11 h-11 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp5IMvU5mzUNUAVtUPVexkzgt3cDPUE6113Q&s"
                  alt=""
                />
                <p className="p-2 font-semibold">
                  {Request.sender.firstName + " " + Request.sender.lastName}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequests;
