import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice";
import connectionRequestReducer from "../Utils/connectionRequestSlice";
import feedReducer from "../Utils/feedSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    connectionRequest: connectionRequestReducer,
    feed: feedReducer,
  },
});

export default appStore;
