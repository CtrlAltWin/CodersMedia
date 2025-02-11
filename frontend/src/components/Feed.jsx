import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { addFeed, removeUserFromFeed } from "../Utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";

const Feed = () => {
  const [X, setX] = useState(0);
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

  if (feed.length === 0) {
    fetch();
    return <div></div>;
  }
  const { _id, firstName, lastName, skills, about, photoURL, age, gender } =
    feed[0];
  const handleSwipe = async (status, id) => {
    await axios.post(
      baseUrl + "/request/send/" + status + "/" + id,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeUserFromFeed(_id));
    setX(0);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full items-center py-12">
      <motion.div
        className="h-[550px] w-[330px]"
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        whileDrag={{
          rotate: X / 15,
          opacity: (200 - Math.abs(X)) / 200,
        }}
        onDrag={(event, info) => {
          if (X > -200 && X < 200) setX(info.offset.x);
        }}
        onDragEnd={() => {
          if (X >= 200) {
            handleSwipe("interested", _id);
          } else if (X <= -200) {
            handleSwipe("ignored", _id);
          }
        }}
      >
        {Math.abs(X) < 200 && (
          <UserCard
            Id={_id}
            FirstName={firstName}
            LastName={lastName}
            Skills={skills}
            About={about}
            PhotoUrl={photoURL}
            Age={age}
            Gender={gender}
          />
        )}
      </motion.div>
      <p className="p-4 text-lg">{"<--Swipe Left or Right-->"}</p>
    </div>
  );
};

export default Feed;
