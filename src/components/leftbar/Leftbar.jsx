import React, { useContext } from 'react'
import { FaUserFriends, FaBookmark, FaStoreAlt, FaFacebookMessenger } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiVideoFill } from "react-icons/pi";
import { MdOutlineRestore, MdFeed, MdHome } from "react-icons/md";
import { BiCalendarStar } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import './Leftbar.scss'
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Leftbar() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleLogout = async () => {
        if (window.confirm('Do you want to Logout ?')) {
            await logout();
            navigate('/login')
        }
    }

    return (
        <div className='leftbar-container'>
            <Link to={`/profile/${user?._id}`} className='leftbar-item'>
                {
                    user.profilePic ?
                        <img
                            src={user.profilePic}
                            alt=""
                        /> :
                        <BsPersonCircle className='leftbar-item-icon' />
                }
                <span>{user.name}</span>
            </Link>
            <Link to={`/`} className='leftbar-item home'>
                <MdHome className='leftbar-item-icon' />
                <span>Home</span>
            </Link>
            <Link to={`/profile/${user?._id}/friends`} className='leftbar-item'>
                <FaUserFriends className='leftbar-item-icon' />
                <span>Friends</span>
            </Link>
            <Link to={`/messages/${user?._id}`} className="leftbar-item">
                <FaFacebookMessenger className='leftbar-item-icon' />
                <span>Messenger</span>
            </Link>
            <Link to={`/profile/${user?._id}/photos`} className="leftbar-item">
                <GrGallery className='leftbar-item-icon' />
                <span>Gallery</span>
            </Link>
            <div
                className="leftbar-item"
                onClick={handleLogout}
            >
                <RiLogoutBoxRLine className='leftbar-item-icon' />
                <span>Log out</span>
            </div>
        </div>
    )
}
