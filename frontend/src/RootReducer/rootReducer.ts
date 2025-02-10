import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../Features/registerSlice"; // Import your authSlice

// Define the root reducer
const rootReducer = combineReducers({
  auth: authReducer, // Add more slices here as needed
});

// Export the root reducer
export default rootReducer;

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;