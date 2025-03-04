import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/registerSlice"; // Import your authSlice
import loginReducer  from "../Features/loginSlice";
import postsReducer from "../Pages/Dashboard/postSlice"; // Import your postsSlice


// Define the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  login: loginReducer,// Add more slices here as needed
  posts: postsReducer
});

// Export the root reducer
export default rootReducer;

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;