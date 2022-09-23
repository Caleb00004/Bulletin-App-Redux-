import {useSelector} from 'react-redux'
import { selectAllPosts } from './postSlice';
import { selectAllUsers } from "../users/usersSlice";

export default function PostAuthor({userId}) {

    // Getting the global user state from redux 'usersSlice'
    const user = useSelector(selectAllUsers)

    // checking if the the postUserId matches any current user.id
    const userAuthor = user.find(user => user.id == userId)
//    console.log(userAuthor)
    return (
        <>
{/*            <span> {user[index].name ? user[index].name : 'No Authour'}</span>  */}
        <span> By {userAuthor ? userAuthor.name : 'Unknown Author'} </span>
        </>
        
    )
}