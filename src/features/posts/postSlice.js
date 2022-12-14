// To handle evertyhing we do with the post we creates
import { createSlice, createSelector, current, createAsyncThunk } from "@reduxjs/toolkit"; // This is to create a new Slice
// import { createSlice, current } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
    post: [],
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed',
    error: null,
    count: 0
}

// NOTE: Thunks are like the Action creators, so they will be exported

// using createAsyncThunk & axios to fetch Api data
// createAsyncThunks takes 2 arguements, 1st -> string for prefix of generated action Tyoe
//    2nd -> is a payload creator callback. this function should return the data fetched
export const fetchPostData = createAsyncThunk('post/fetchPosts', async () => {
    console.log('fetch post Data')
      const response = await axios.get(POSTS_URL)
      return response.data
    }
)

// A new Thunk to add Post. It send the post Body to the Post API
// The 'initail Post' is what is being submitted to the api. i.e the data that was inputed
export const addNewPost = createAsyncThunk('posts/addNewPost', async (testvarame) => {
    console.log(testvarame)
    const response = await axios.post(POSTS_URL, testvarame)
    return response.data
})

export const updatePost = createAsyncThunk('put/updatePost', async (initialPost) => {
    const {id} = initialPost
    console.log(initialPost)
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        console.log(response)
        return response.data
    } catch (err) {
        //return err.message;
        // This is incase if the post e want to update was created manually and not fetched from the server
        return initialPost; // only for testing Redux!
    }

})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const {id} = initialPost
    console.log(initialPost)
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost; // check if post was succesfully deleted
        return `${response?.status}: ${response?.statusText}`; // if not return whtever status or status text was returned, so it can be console logged to find out the problem.
    } catch (err) {
        return err.message;
    }

})

// NOTE:
// Sometimes slices reducers may need to respond to other reducers that wer'ent defined as Part of the slices Reducers.
//      You use an extraReducers function. This accepts a builder parameter.
//      builder Parameter is an object that let's us define additional case reducers that run in response to the actions def=ined outside of the slice

const postSlice = createSlice ({
    name: 'post',  // name of slice
    initialState,  
    reducers: {
        // creating a reducer function to handle data submt in form
        increment: {
            reducer(state, action) {
                return {...state, count: state.count + 1}
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const {reactKey, id} = action.payload
//                console.log(current(state.post))
                // checked the Id of the Post and then increased the reacton based on the Reaction Key
                // Note To Self: To use variable Name as key in object --> object[keyVarName] = 'value', You can't just use it normally like when getting an object key value. 
                // Check: https://www.geeksforgeeks.org/how-to-use-a-variable-for-a-key-in-a-javascript-object-literal/ more explanation
                let mapPost = current(state.post).map(postItem => {
                    return postItem.id === id ? {...postItem, reactions: {...postItem.reactions, [reactKey] : postItem.reactions[reactKey] + 1}} : postItem
                })
                console.log(mapPost)
                console.log(current(state))

 //               console.log(state.post)
//                return state.post = mapPost
                return {post: mapPost, status: 'succeeded', error: null}
            }
        }
    }, 
    extraReducers(builder){
        builder
            .addCase(fetchPostData.pending, (state, action) => {
                console.log('loading')
                state.status = 'loading'
            })
            .addCase(fetchPostData.fulfilled, (state, action) => {
                console.log('succeeded')
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });

                // Add any fetched posts to the array
                state.post = loadedPosts
//                state.post = state.post.concat(loadedPosts)
            })
            .addCase(fetchPostData.rejected, (state, action) => {
                console.log('failed')
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.post.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                console.log(action.payload)
                state.post.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) { // to check if the post was succesfully updated. (here we are checking if the payload object has an id) payload is new 'updated' obj returned from the api put request.
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                } // everything under will only run if the post was succesfully updated. i.e the above if statement does not run.
                let {id} = action.payload
                action.payload.date = new Date().toISOString();

                let prevsate = current(state.post)
                let update = prevsate.map(stateItem => stateItem.id == id ? stateItem = action.payload : stateItem)
                console.log(update)
                return {post: update, status: 'succeeded', error: null}
 //               console.log(action.payload)
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                console.log(action.payload)
                if (!action.payload?.id) { // to check if the post was succesfully deleted. (here we are checking if the payload object has an id)
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                } // everything under will only run if the post was succesfully updated. i.e the above if statement does not run.
                let {id} = action.payload

                let prevsate = current(state.post)
                let deleted = prevsate.filter(stateItem => stateItem.id !== id )
                console.log(deleted)

                state.post = deleted
//                return {post: deleted, status: 'succeeded', error: null}
 //               console.log(action.payload)
            })
    }
})


// the first .post is the name of given to the slice, the second .post is the post array inside the state object
export const selectAllPosts = (state) => state.post.post 
export const getPostsStatus = (state) => state.post.status
export const getPostsError = (state) => state.post.error
export const countValue = (state) => state.post.count
export const selectPostById = (state, PostId) => (
    state.post.post.find(post => post.id === PostId )
//    console.log(state)
)

export const selectPostUsers = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (post, userId) => post.filter(post => post.userId === userId)
)

// postSlice automatically generated an action creator with the same name as the reducer function you created in the postSLice
export const {reactionAdded, increment} = postSlice.actions // so i'm just exporting the action creator so i can use it in other files.
export default postSlice.reducer // exporting the postslice reducer so i can comibine it with other reducers in the global store in 'Store.js' file



/* const initialState = [
    {
        id: 1,
        title: 'My first Post',
        content: `Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Fugiat laboriosam officiis ad fuga eaque! Mollitia maxime, debitis nihil id quos corporis 
                obcaecati placeat. Facere, sunt vero dolorem cupiditate voluptate commodi!`,
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffe: 0
        }
    }
]
*/