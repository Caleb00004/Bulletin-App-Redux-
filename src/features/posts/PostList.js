// A Post List Component

import { useSelector, useDispatch } from "react-redux";
import './postlist.css'
import { reactionAdded } from "./postSlice"; // importing the postAdd action created in the post SLice.js file || This action will be passed to the useDispatch hook.
import { selectAllPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TmeAgoComponent";

export default function PostList() {

//    const post = useSelector(state => state.post)
    const post = useSelector(selectAllPosts)
    const reactionDispatch = useDispatch()

    // ordering the post array based on time posted using sort method. ( It will return a new array now ordered based on the conditons set. )
    // b.date.localeComapre(a.date) returns a 1, -1 or 0 [ more explanation: https://www.w3schools.com/jsref/jsref_localecompare.asp ]
    // The slice is to create a shallow/new array copy that we are operating on. so the main post array is still the same.
    const orderedPost = post.slice().sort((a,b) => b.date.localeCompare(a.date))

    const thumbsUp = 'thumbsUp'

    function handleReaction (id, reactKey) {
        reactionDispatch(reactionAdded({reactKey, id}))
    }

    const Items = orderedPost.map(postItem => (
        <article key={postItem.id}>
            {/* console.log(postItem.id) */}
            <h2>{postItem.title}</h2>
            <p>{postItem.content.substring(0,120)}</p>
            <PostAuthor userId={postItem.userId}/> 
            <TimeAgo timeStamp={postItem.date}/>
            <div className={'reactions'} style={{display: 'flex' }}>
                <p onClick={() => handleReaction(postItem.id, 'heart')} >heart: {postItem.reactions.heart} </p>
                <p onClick={() => handleReaction(postItem.id, 'thumbsUp')}> Thumbs Up: {postItem.reactions.thumbsUp}</p>
                <p onClick={() => handleReaction(postItem.id, 'wow')}>wow: {postItem.reactions.wow}</p>
                <p onClick={() => handleReaction(postItem.id, 'rocket')} >rocket: {postItem.reactions.rocket}</p>
                <p onClick={() => handleReaction(postItem.id, 'coffe')} >Coffe: {postItem.reactions.coffe}</p>
            </div>
        </article>
    ))
    console.log(post)
    return (
        <>
            <h1>Post List Component</h1>
            {Items}
        </>        
    )
}