import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth"
import userReducer from "./user"
import testStatusReducer from "./testStatus";

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        testStatus: testStatusReducer,
    }
});