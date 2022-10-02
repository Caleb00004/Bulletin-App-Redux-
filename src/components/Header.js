import {Link} from 'react-router-dom'
import './header.css'
export default function Header() {
    return (
        <header>
            <h1>Blog Project</h1>
            <p><Link to='/'> Home </Link></p>
            <p><Link to='/post'> Addpost </Link></p>
        </header>
    )
}