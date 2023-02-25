import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false
    },
    reducers: {
        changeAuth: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { changeAuth } = authSlice.actions;

export default authSlice.reducer;