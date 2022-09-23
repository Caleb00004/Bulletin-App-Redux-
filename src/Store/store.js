import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice"; // importing the postReducer created in PostSLice
import userReducer from "../features/users/usersSlice";

// Here it will combine all the reducers & state into one global state object
export const store = configureStore({
    reducer: {
        post: postReducer,
        user: userReducer
    }
})

