import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // importing the useDipatch hook
import { deletePost } from "../features/posts/postSlice";
import { selectPostById, updatePost } from "../features/posts/postSlice";
import { selectAllUsers } from "../features/users/usersSlice";
import { useParams, useNavigate } from "react-router"

export default function Edit() {
    const {postId} = useParams()

    const currentPost = useSelector((state) => selectPostById(state, Number(postId)))

    const [postTitle, setPostTitle] = useState(currentPost.title)
    const [postContent, setPostContent] = useState(currentPost.body)
    const [userId, setUserId] = useState(currentPost.userId)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const navigateTo = useNavigate()
    const allUsers = useSelector(selectAllUsers)
    const dispatcher = useDispatch()

    if (!currentPost) {
        return (
            <h1>Current Post Not Found</h1>
        )
    }

    const userOptions = allUsers.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

//    console.log(postId)

    const canSave = [postTitle,postContent,userId].every(Boolean) && addRequestStatus === 'idle'


  //  console.log(currentPost)
    
    function savePost() {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
//                newPostDispatch(addNewPost({title: postTitle, body: postContent, userId})).unwrap()
                dispatcher(updatePost({title: postTitle, body: postContent, userId, id: currentPost.id, reactions: currentPost.reactions})).unwrap()

                setPostTitle('')
                setPostContent('')
                setUserId('')

                navigateTo(`post/${currentPost.postId}`)
            } catch (err) {
                console.error('failed to save post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }
    }
    
    console.log('ran')
    
    function hadnleDelete() {
        console.log('rannning')
            dispatcher(deletePost(currentPost)).unwrap()

            navigateTo(`post`)
        }
    

    return (
        <section>
            <h1>Edit Page Component</h1>
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
            <button onClick={hadnleDelete}>Delete Post</button>
            
        </section>
    )
}