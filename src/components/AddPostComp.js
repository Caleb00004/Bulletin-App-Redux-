// A compoent to add Post in Form
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // importing the useDipatch hook
//import { postAdd } from "./postSlice"; // importing the postAdd action created in the post SLice.js file || This action will be passed to the useDispatch hook.
import { addNewPost } from "../features/posts/postSlice";
import { selectAllUsers } from "../features/users/usersSlice";
import './addpostcomp.css'

export default function AddPost() {
    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const newPostDispatch = useDispatch()

    const allUsers = useSelector(selectAllUsers)
//    console.log(allUsers)

//    const canSave = Boolean(postTitle) && Boolean(postContent) && Boolean(userId) && addRequestStatus === 'idle'
    const canSave = [postTitle,postContent,userId].every(Boolean) && addRequestStatus === 'idle'

    const userOptions = allUsers.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    )) 


    function savePost() {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                newPostDispatch(addNewPost({title: postTitle, body: postContent, userId})).unwrap()

                setPostTitle('')
                setPostContent('')
                setUserId('')
            } catch (err) {
                console.error('failed to save post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }


    return (
        <section>
            <input
                style={{backgroundColor: 'white', color: 'black'}}
                placeholder="postTitle"
                name='postTitle'
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
            >
            </input>
            <select onChange={(e) => setUserId(e.target.value)} value={userId}>
                <option value={''}></option>
                {userOptions}
            </select>
            <textarea
                    style={{backgroundColor: 'white', color: 'black'}}
                    name="postContent"
                    placeholder="post Content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
            >
            </textarea>
            <button disabled={!canSave} onClick={savePost}>Add Post</button>

        </section>
    )
}

// Initial Save Post button functionality without implementiing API
/*
    function savePost() {
        if (canSave) {
            newPostDispatch(
                postAdd(postTitle, postContent, userId) // sending all this data to the prepared callback
                /* This has being simplified by using the prepareCallback
                postAdd(
                    {
                        id: nanoid(),
                        title: postTitle,
                        content: postContent
                    } 
                )*
            )
            setPostTitle('')
            setPostContent('')
            setUserId('')
        }
    }
*/
