import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth"
import userReducer from "./user"
import testStatusReducer from "./testStatus";
import runtimeReducuer from "./runtime";

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        testStatus: testStatusReducer,
        runtime: runtimeReducuer,
    }
});