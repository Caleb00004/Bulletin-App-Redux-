// A Post List Component

import { useSelector, useDispatch } from "react-redux";
import './postlist.css'
import { reactionAdded } from "./postSlice"; // importing the postAdd action created in the post SLice.js file || This action will be passed to the useDispatch hook.
import { selectAllPosts, getPostsStatus, getPostsError } from "./postSlice";
import { Link } from "react-router-dom";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TmeAgoComponent";

export default function PostList() {

//    const post = useSelector(state => state.post)
    const post = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const Error = useSelector(getPostsError)

    // ordering the post array based on time posted using sort method. ( It will return a new array now ordered based on the conditons set. )
    // b.date.localeComapre(a.date) returns a 1, -1 or 0 [ more explanation: https://www.w3schools.com/jsref/jsref_localecompare.asp ]
    // The slice is to create a shallow/new array copy that we are operating on. so the main post array is still the same.

    const dispatch = useDispatch()

    function handleReaction (id, reactKey) {
        dispatch(reactionAdded({reactKey, id}))
    }

    let Items;

    if (postsStatus === 'loading') {
        Items = <h1>Loading</h1>
    } else if (postsStatus === 'succeeded') {

        const orderedPost = post.slice().sort((a,b) => b.date.localeCompare(a.date))

        Items = orderedPost.map(postItem => (
            <article key={postItem.id}>
                {console.log('rendered')}
                <span><h2>{postItem.title}</h2><Link to={`/post/edit/${postItem.id}`}><button>Edit</button></Link></span>
                <p>{postItem.body.substring(0,75)}...</p>
                <Link to={`post/${postItem.id}`}> View Post</Link>
                <PostAuthor userId={postItem.userId}/> 
                <TimeAgo timeStamp={postItem.date}/>
                <div className={'reactions'} style={{display: 'flex' }}>
                    <p onClick={() => handleReaction(postItem.id, 'heart')} >heart: {postItem.reactions.heart} </p>
                    <p onClick={() => handleReaction(postItem.id, 'thumbsUp')}> Thumbs Up: {postItem.reactions.thumbsUp}</p>
                    <p onClick={() => handleReaction(postItem.id, 'wow')}>wow: {postItem.reactions.wow}</p>
                    <p onClick={() => handleReaction(postItem.id, 'rocket')} >rocket: {postItem.reactions.rocket}</p>
                    <p onClick={() => handleReaction(postItem.id, 'coffee')} >Coffe: {postItem.reactions.coffee}</p>
                </div>
            </article>
        )) 
    } else if (postsStatus === 'failed') {
        Items = <h1>Failed</h1>
    } 

//    console.log(post)
    return (
        <div className="postList">
            { Items }
        </div>        
    )
}