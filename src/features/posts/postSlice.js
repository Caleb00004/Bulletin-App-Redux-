// To handle evertyhing we do with the post we creates
import { createSlice, nanoid, current } from "@reduxjs/toolkit"; // This is to create a new Slice
//import { createSlice, current } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

const initialState = [
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
},
    {
        id: 2,
        title: 'learnig redux 2',
        content: ` Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Fugiat laboriosam officiis ad fuga eaque! Mollitia maxime, debitis nihil id quos corporis 
                obcaecati placeat. Facere, sunt vero dolorem cupiditate voluptate commodi!`,
        date: sub(new Date(), {minutes: 7}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffe: 0
        }
    }
]

const postSlice = createSlice ({
    name: 'post',  // name of slice
    initialState,  
    reducers: {
        // creating a reducer function to handle data submt in form
        postAdd: { 
            reducer(state, action) {   // after adding this function reducer, The postSlice will automatically generate an action creator function, with the same name
                console.log(...state)
                return [...state, action.payload]
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffe: 0
                        }
                    }
                }
            }
        },
        reactionAdded: {
            reducer(state, action) {
                const {reactKey, id} = action.payload
                
                // checked the Id of the Post and then increased the reacton based on the Reaction Key
                // Note To Self: To use variable Name as key in object --> object[keyVarName] = 'value', You can't just use it normally like when getting an object key value. 
                // Check: https://www.geeksforgeeks.org/how-to-use-a-variable-for-a-key-in-a-javascript-object-literal/ more explanation
                let mapPost = current(state).map(postItem => {
                    return postItem.id === id ? {...postItem, reactions: {...postItem.reactions, [reactKey] : postItem.reactions[reactKey] + 1}} : postItem
                })

                return mapPost

            }
        }
    } 
})
export const selectAllPosts = (state) => state.post

// postSlice automatically generated an action creator with the same name as the reducer function you created in the postSLice
export const {postAdd, reactionAdded} = postSlice.actions // so i'm just exporting the action creator so i can use it in other files.
export default postSlice.reducer // exporting the postslice reducer so i can comibine it with other reducers in the global store in 'Store.js' file

