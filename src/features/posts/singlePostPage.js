import { useSelector, useDispatch } from "react-redux"
import { selectPostById } from "./postSlice"
import { reactionAdded } from "./postSlice"; 
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TmeAgoComponent";
import { useParams } from "react-router";

export default function SinglePostPage() {
    
    const {postId} = useParams()
    // retrieving the PostId
    const singlePost = useSelector((state) => selectPostById(state, Number(postId)))
    
    console.log('single post Page')
    console.log(singlePost)
    const dispatch = useDispatch()

    function handleReaction (id, reactKey) {
        dispatch(reactionAdded({reactKey, id}))
        
    }

    if (!singlePost) {
        return (
            <h1>Post is not Found Brother!.</h1>
        )
    } else {
        return (
            <article key={singlePost.id}>
                {/* console.log(singlePost.id) */}
                <h2>{singlePost.title}</h2>
                <p>{singlePost.body}</p>
                <PostAuthor userId={singlePost.userId}/> 
                <TimeAgo timeStamp={singlePost.date}/>
                <div className={'reactions'} style={{display: 'flex' }}>
                    <p onClick={() => handleReaction(singlePost.id, 'heart')} >heart: {singlePost.reactions.heart} </p>
                    <p onClick={() => handleReaction(singlePost.id, 'thumbsUp')}> Thumbs Up: {singlePost.reactions.thumbsUp}</p>
                    <p onClick={() => handleReaction(singlePost.id, 'wow')}>wow: {singlePost.reactions.wow}</p>
                    <p onClick={() => handleReaction(singlePost.id, 'rocket')} >rocket: {singlePost.reactions.rocket}</p>
                    <p onClick={() => handleReaction(singlePost.id, 'coffe')} >Coffe: {singlePost.reactions.coffe}</p>
                </div>
            </article>
        )
    }

}