import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { addFeed, removeUserFromFeed } from "../Utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetch = async () => {
    try {
      const feed = await axios.get(baseUrl + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feed?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  if (feed.length === 0) return <div></div>;

  const { _id, firstName, lastName, skills, about, photoURL } = feed[0];
  return (
    <div className="flex flex-grow w-screen justify-center">
      <UserCard
        Id={_id}
        FirstName={firstName}
        LastName={lastName}
        Skills={skills}
        About={about}
        PhotoUrl={photoURL}
      />
    </div>
  );
};

export default Feed;
