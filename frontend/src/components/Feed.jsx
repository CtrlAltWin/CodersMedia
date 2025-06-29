import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../Utils/url";
import { addFeed, removeUserFromFeed } from "../Utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { Heart, X } from "lucide-react";
import LeftPannel from "./LeftPannel";
import RightPanel from "./RightPannel";

const Feed = () => {
  const [swipeOffset, setSwipeOffset] = useState(0);
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
    if (feed.length == 0) fetch();
  }, []);

  if (feed.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full text-center pt-64">
        <h2 className="text-xl font-semibold mb-2">
          🎉 You've swiped through all profiles!
        </h2>
        <p className="text-sm">
          Check back later to discover and connect with more coders.
        </p>
      </div>
    );
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
    setSwipeOffset(0);
  };

  return (
    <div className="grid md:grid-cols-[1fr_450px_1fr] min-h-[calc(100vh-5rem)]">
      {/* Left Branding */}
      <div className="hidden md:flex">
        <LeftPannel />
      </div>

      {/* Center Swipe Card */}
      <div className="flex flex-col items-center py-2">
        <motion.div
          className="w-full flex flex-col items-center h-[600px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          whileDrag={{
            rotate: swipeOffset / 25,
            opacity: 1 - Math.min(Math.abs(swipeOffset) / 300, 0.75),
          }}
          onDrag={(event, info) => {
            const offsetX = info.offset.x;
            setSwipeOffset(offsetX);
          }}
          onDragEnd={() => {
            if (swipeOffset >= 120) {
              handleSwipe("interested", _id);
            } else if (swipeOffset <= -120) {
              handleSwipe("ignored", _id);
            } else {
              setSwipeOffset(0);
            }
          }}
        >
          {Math.abs(swipeOffset) < 300 && (
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
        <div className="mt-4 flex justify-center gap-8 w-full text-gray-500">
          <button
            className="active:scale-110 duration-300 transition-transform ease-in-out"
            title="ignore"
          >
            <X
              className="h-12 w-12 p-4 rounded-full bg-red-600 text-white"
              onClick={() => {
                handleSwipe("ignored", _id);
              }}
            />
          </button>
          <button
            className="active:scale-110 duration-300 transition-transform ease-in-out"
            title="intrested"
          >
            <Heart
              className="h-12 w-12 p-4 rounded-full bg-green-600 text-white"
              onClick={() => {
                handleSwipe("interested", _id);
              }}
            />
          </button>
        </div>
      </div>

      {/* Right Info Panel */}
      <div className="hidden md:flex">
        <RightPanel
          title="How It Works"
          message={
            <>
              <p className="mb-3">
                Swipe right to{" "}
                <span className="font-medium text-green-600">connect</span> with
                a coder you're interested in.
              </p>
              <p>
                Swipe left to{" "}
                <span className="font-medium text-red-500">skip</span> and move
                on to the next profile.
              </p>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Feed;
