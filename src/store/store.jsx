import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./counterSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
