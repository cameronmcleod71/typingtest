import { createSlice } from "@reduxjs/toolkit"

export const runtimeSlice = createSlice({
    name: "runtime",
    initialState: {
        currentTestTime: 0
    },
    reducers: {
        setTime: (state, action) => {
            state.currentTestTime = action.payload;
        }
    }
});

export const { setTime } = runtimeSlice.actions;

export default runtimeSlice.reducer;