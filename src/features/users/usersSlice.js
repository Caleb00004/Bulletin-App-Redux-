import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchUserData = createAsyncThunk('users/fetchUsers', async () => {
    console.log('fetch user data')
      const response = await axios.get(USERS_URL)
      return response.data
    }
)

const initialState = [
/*    {id: 0, name: 'caleb Blake'},
    {id: 1, name: 'jake gylenhall'},
    {id: 2, name: 'mike Jack'} */
]

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
            .addCase(fetchUserData.pending, (state,action) => {
                console.log('Pending')
            })
            .addCase(fetchUserData.fulfilled, (state,action) => {
                console.log('User Fetched')
                return action.payload
/*                state.users = action.payload */
            })
    }
})

//                                       The'.user' is because that was the nae i gave to userReducer in the store.js file.
export const selectAllUsers = (state) => state.user
export default userSlice.reducer

