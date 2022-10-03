import { useSelector} from "react-redux"; 
import { selectAllPosts } from "../posts/postSlice";
// import { selectSpecificUser } from "./usersSlice";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { selectPostUsers } from "../posts/postSlice";

export default function UserPage() {

    const {userId} = useParams()

    const postsForUser = useSelector(state => selectPostUsers(state, Number(userId)))
    console.log(postsForUser)
//    const user
/* 
    const post = useSelector(selectAllPosts)

    const userObject = useSelector((state) => selectSpecificUser(state, Number(userId)))

    const usersPost = post.filter(postItem => postItem.userId == Number(userId))
*/
//  const usersPostList = usersPost.map(postItem => <li><Link to={`/post/${postItem.id}`}>{postItem.title}</Link></li>)
    const usersPostList = postsForUser.map(postItem => <li><Link to={`/post/${postItem.id}`}>{postItem.title}</Link></li>)

    return (
        <div className="userPage">
{/*            <h1>User: {userObject[0].name}</h1>
            <h3>UserName: {userObject[0].username}</h3>
    */}
            <h3>Posts</h3>
            <ul>
                {usersPostList}
            </ul>
        </div>

    )
}