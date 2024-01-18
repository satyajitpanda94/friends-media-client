import React, { useContext } from 'react'
import { FaUserFriends, FaBookmark, FaStoreAlt, FaFacebookMessenger } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";
import { PiVideoFill } from "react-icons/pi";
import { MdOutlineRestore, MdFeed } from "react-icons/md";
import { BiCalendarStar } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";
import './Leftbar.scss'
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Leftbar() {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)

    const handleLogout = async () => {
        alert('Do you want to Logout ?')
        await logout();
        navigate('/login')
    }

    return (
        <div className='sidebar-container'>
            <span className='sidebar-item'>
                {
                    user.profilePic ?
                        <img
                            src={user.profilePic}
                            alt=""
                        /> :
                        <BsPersonCircle className='sidebar-item-icon' />
                }
                <span>{user.name}</span>
            </span>
            <span className='sidebar-item'>
                <FaUserFriends className='sidebar-item-icon' />
                <span>Friends</span>
            </span>
            <span className='sidebar-item'>
                <MdOutlineRestore className='sidebar-item-icon' />
                <span>Memories</span>
            </span>
            <span className='sidebar-item'>
                <FaBookmark className='sidebar-item-icon' />
                <span>Saved</span>
            </span>
            <span className='sidebar-item'>
                <HiMiniUserGroup className='sidebar-item-icon' />
                <span>Groups</span>
            </span>
            <span className='sidebar-item'>
                <PiVideoFill className='sidebar-item-icon' />
                <span>Videos</span>
            </span>
            <span className='sidebar-item'>
                <FaStoreAlt className='sidebar-item-icon' />
                <span>MarketPlace</span>
            </span>
            <span className='sidebar-item'>
                <MdFeed className='sidebar-item-icon' />
                <span>Feeds</span>
            </span>
            <span className='sidebar-item'>
                <BiCalendarStar className='sidebar-item-icon' />
                <span>Events</span>
            </span>
            <span className="sidebar-item">
                <FaFacebookMessenger className='sidebar-item-icon' />
                <span>Messenger</span>
            </span>
            <span className="sidebar-item">
                <GrGallery className='sidebar-item-icon' />
                <span>Gallery</span>
            </span>
            <span
                className="sidebar-item"
                onClick={handleLogout}
            >
                <RiLogoutBoxRLine className='sidebar-item-icon' />
                <span>Log out</span>
            </span>
        </div>
    )
}
