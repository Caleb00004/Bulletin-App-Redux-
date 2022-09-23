import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: 0, name: 'caleb Blake'},
    {id: 1, name: 'jake gylenhall'},
    {id: 2, name: 'mike Jack'}
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

//                                       The'.user' is because that was the nae i gave to userReducer in the store.js file.
export const selectAllUsers = (state) => state.user
export default userSlice.reducer

