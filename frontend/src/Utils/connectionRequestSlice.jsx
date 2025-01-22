import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: "connectionRequest",
  initialState: [],
  reducers: {
    addConnectionRequests: (state, action) => {
      return action.payload;
    },
    removeConnectionRequest: (state, action) => {
      const newState = state.filter((Request) => {
        return Request.requestId !== action.payload;
      });
      return newState;
    },
  },
});

export const {addConnectionRequests, removeConnectionRequest} = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;