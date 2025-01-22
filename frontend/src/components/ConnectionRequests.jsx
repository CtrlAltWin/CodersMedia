import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import {
  addConnectionRequests,
  removeConnectionRequest,
} from "../Utils/connectionRequestSlice";
import { useDispatch, useSelector } from "react-redux";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const fetch = async () => {
    const connectionRequests = await axios.get(
      baseUrl + "/user/request/recieved/pending",
      {
        withCredentials: true,
      }
    );
    dispatch(addConnectionRequests(connectionRequests.data.requests));
  };
  const [Show, setShow] = useState(false);
  const Requests = useSelector((store) => store.connectionRequest);
  useEffect(() => {
    fetch();
  }, []);

  if (Requests === null) return <div></div>;

  return (
    <div className="flex flex-grow justify-center">
      <div className="flex flex-col items-center w-4/12 gap-6 bg-base-200 p-4 rounded-3xl mt-36">
        {/* heading */}
        <h2
          className="font-mono text-lg p-2"
          onClick={() => {
            setShow(Show === true ? false : true);
          }}
        >
          {"Requests (" + Requests?.length + ")"}
        </h2>

        {/* content */}

        {Show && (
          <div className="flex flex-col gap-4">
            {Requests.map((Request) => {
              return (
                <div key={Request.requestId} className="flex gap-2">
                  <img
                    className="w-11 h-11 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp5IMvU5mzUNUAVtUPVexkzgt3cDPUE6113Q&s"
                    alt=""
                  />
                  <p className="p-2 font-extralight">
                    {Request.sender.firstName + " " + Request.sender.lastName}
                  </p>

                  {/* accept and reject buttons */}

                  <div className="ml-auto flex gap-2">
                    <button
                      className="btn btn-secondary"
                      onClick={async () => {
                        await axios.post(
                          baseUrl +
                            "/request/review/rejected/" +
                            Request.requestId,
                          {},
                          {
                            withCredentials: true,
                          }
                        );
                        dispatch(removeConnectionRequest(Request.requestId));
                      }}
                    >
                      reject
                    </button>
                    <button
                      className="btn btn-primary mx-auto"
                      onClick={async () => {
                        const req_id = Request.requestId;
                        await axios.post(
                          baseUrl +
                            "/request/review/accepted/" +
                            Request.requestId,
                          {},
                          {
                            withCredentials: true,
                          }
                        );
                        dispatch(removeConnectionRequest(Request.requestId));
                      }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequests;
