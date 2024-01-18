import React, { useContext } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { IoPersonSharp } from 'react-icons/io5'

export default function Navbar() {
    const { user } = useContext(AuthContext)

    return (
        <div className='navbarContainer'>
            <div className="navbarLeft">
                <Link to={'/'}>
                    <span className="logo">
                        <span className='logoFirstHalf'>Friends</span>Media
                    </span>
                </Link>
            </div>
            <div className="navbarRight">
                <Link to={`/`}>
                    <span>Homepage</span>
                </Link>
                <span>Timeline</span>
                <Link to={`/profile/${user._id}`}>
                    {
                        user.profilePic ?
                            <img
                                src={user.profilePic}
                                alt=""
                            /> :
                            <IoPersonSharp className='avatar' />
                    }
                </Link>
            </div>
        </div>
    )
}
