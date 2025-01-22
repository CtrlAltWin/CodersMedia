import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Utils/userSlice";
import connectionRequestReducer from "../Utils/connectionRequestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    connectionRequest: connectionRequestReducer,
  },
});

export default appStore;
