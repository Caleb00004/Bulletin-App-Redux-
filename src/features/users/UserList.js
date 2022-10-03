import { useSelector, useDispatch } from "react-redux"
import { selectAllUsers } from "./usersSlice"
import { Link } from "react-router-dom"

export default function UserList() {
    const users = useSelector(selectAllUsers)

    let list = users.map(userItem => (
        <li><Link to={`${userItem.id}`}>{userItem.name}</Link></li>
    ))
    
    return (
        <div className="userPage">
            <h2 style={{marginLeft: '2rem'}}>Users</h2>

            <ul>{list}</ul>
            
        </div>
    )
}