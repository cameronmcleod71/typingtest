import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth"
import userReducer from "./user"

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
});