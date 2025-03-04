import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of the auth state
interface LoginState {
    token: string | null;
    loading: boolean;
    error: string | null;
}
// Define the initial state
const initialState: LoginState = {
    token: localStorage.getItem("token") || null, // Load the token from local storage
    loading: false,
    error: null,
};
// Define the login thunk
export const loginUser = createAsyncThunk(
    "auth/loginUser",// The action type
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/login", credentials);
            const { token } = response.data; // Extract the token
            localStorage.setItem("token", token); // Store the token in local storage
            return token;
            // If there's an error, throw it
        }
        catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);
// Define the logout thunk

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("token"); // Remove the token from local storage
            state.token = null; // Update the token in the state
            state.error = null; // Clear any error message
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;// Update the token in the state
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string; // Update the error message in the state
        });
    },
});
// Export the logout action
export const logout = loginSlice.actions.logout;
// Export the auth reducer
export default loginSlice.reducer;

