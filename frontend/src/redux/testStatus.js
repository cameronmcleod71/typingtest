import { createSlice } from "@reduxjs/toolkit"

export const testStatusSlice = createSlice({
    name: "testStatus",
    initialState: {
        isCompleted: false,
        isStarted: false
    },
    reducers: {
        testCompleted: (state, action) => {
            state.isCompleted = action.payload;
        },
        testStarted: (state, action) => {
            state.isStarted = action.payload;
        },
        testReset: (state, action) => {
            state.isStarted = action.payload;
            state.isCompleted = action.payload;
        }
    }
});

export const { testCompleted, testStarted, testReset } = testStatusSlice.actions;

export default testStatusSlice.reducer;