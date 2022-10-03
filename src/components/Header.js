import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../features/posts/postSlice'
import { countValue } from '../features/posts/postSlice'
import './header.css'

export default function Header() {

    const count = useSelector(countValue)
    const dispatcher = useDispatch()

    console.log(count)
    return (
        <header>
            <h1>Blog Project</h1>
            <p><Link to='/'> Home </Link></p>
            <p><Link to='/post'> Addpost </Link></p>
            <p><Link to='/user'> User </Link></p>
            <button onClick={() => dispatcher(increment())}>{count}</button>
        </header>
    )
}