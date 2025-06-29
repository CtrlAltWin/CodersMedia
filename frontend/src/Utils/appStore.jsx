import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import connectionRequestReducer from "../Utils/connectionRequestSlice";
import feedReducer from "../utils/feedSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    connectionRequest: connectionRequestReducer,
    feed: feedReducer,
  },
});

export default appStore;
