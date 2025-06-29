import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionRequestReducer from "./connectionRequestSlice";
import feedReducer from "./feedSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    connectionRequest: connectionRequestReducer,
    feed: feedReducer,
  },
});

export default appStore;
