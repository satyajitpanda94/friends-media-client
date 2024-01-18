import React, { useContext, useRef, useState } from 'react'
import './Profile.scss'
import { MdEdit } from "react-icons/md";
import Navbar from '../../components/navbar/Navbar';
import { FaBriefcase } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import SharePost from '../../components/sharePost/SharePost';
import Posts from '../../components/posts/Posts';
import EditProfile from '../../components/editProfile/EditProfile';
import { AuthContext } from '../../context/authContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Friend from '../../components/friend/Friend';

export default function Profile() {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { user: currentUser } = useContext(AuthContext)

    const [openEditProfile, setOpenEditProfile] = useState(false)
    const { id: paramId } = useParams()

    const { data: user } = useQuery({
        queryKey: ["user", paramId],
        queryFn: async () => {
            const res = await axios.get(`${apiBaseURL}/user/${paramId}`)
            return res.data
        }
    })

    const { data: posts } = useQuery({
        queryKey: ["allposts", paramId],
        queryFn: async () => {
            const res = await axios.get(apiBaseURL + "/post/profile/" + paramId)
            return res.data
        }
    })

    return (<>
        <div className="navbar-wrapper">
            <Navbar />
        </div>
        <div className={
            openEditProfile ? 'profile-container active-edit-profile' : 'profile-container'
        }>
            <div className="profile-top">
                <div className="cover-pic">
                    <img
                        src={user?.coverPic ? user.coverPic : "/coverpic.jpg"}
                        alt=""
                    />
                </div>
            </div>
            <div className="profile-middle">
                <div className="profile-pic-container">
                    <div className="profile-pic">
                        <img
                            src={user?.profilePic ? user.profilePic : "/avatar.png"}
                            alt=""
                        />
                    </div>
                    <div className="user-info">
                        <div className="name">{user?.name}</div>
                        <div>105 friends</div>
                    </div>
                </div>
                {
                    currentUser._id === paramId &&
                    (< div
                        className="edit-profile-button"
                        onClick={e => setOpenEditProfile(!openEditProfile)}
                    >
                        <MdEdit className='edit-icon' />
                        Edit Profile
                    </div>)
                }
            </div>
            <div className="profile-buttom" >
                <div className="profile-buttom-left">
                    <div className="intro">
                        <h2 className='title'>
                            Intro
                        </h2>
                        {
                            user?.worksAt &&
                            <div className='intro-item'>
                                <FaBriefcase className='intro-item-icon' />
                                <span>{user?.worksAt}</span>
                            </div>
                        }
                        {
                            user?.school &&
                            <div className='intro-item'>
                                <FaGraduationCap className='intro-item-icon' />
                                <span>{user?.school}</span>
                            </div>
                        }
                        {
                            user?.college &&
                            <div className='intro-item'>
                                <FaGraduationCap className='intro-item-icon' />
                                <span>{user?.college}</span>
                            </div>
                        }
                        {
                            user?.currentAddress &&
                            <div className='intro-item'>
                                <IoHome className='intro-item-icon' />
                                <span>{user?.currentAddress}</span>
                            </div>
                        }
                        {
                            user?.permanentAddress &&
                            <div className='intro-item'>
                                <MdPlace className='intro-item-icon' />
                                <span>{user?.permanentAddress}</span>
                            </div>
                        }
                    </div>
                    <div className="photos">
                        <h2 className='title'>
                            <span className="title-left">
                                Photos
                            </span>
                            <span className="title-right">
                                See all Photos
                            </span>
                        </h2>
                        <div className="photo-gallery">
                            {
                                posts && posts.map(
                                    (post, indx) => {
                                        return post.img &&
                                        (<Link to={`/photo/${post._id}`}>
                                            <img src={post?.img} alt="" key={indx} />
                                        </Link>)
                                    }
                                )
                            }
                        </div>
                    </div>
                    <div className="friends">
                        <h2 className='title'>
                            <span className="title-left">
                                Friends
                            </span>
                            <span className="title-right">
                                See all friends
                            </span>
                        </h2>
                        <div className="friends-container">
                            {
                                user?.friends.map(
                                    (friendId, indx) => (
                                        indx < 9 &&
                                        <Friend friendId={friendId} key={indx} />
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="profile-buttom-right">
                    {
                        currentUser._id === paramId &&
                        <SharePost />
                    }
                    <Posts posts={posts} />
                </div>
            </div>
            {
                openEditProfile &&
                <div className="edit-profile-modal">
                    <div
                        className="edit-profile-overlay"
                        onClick={e => setOpenEditProfile(!openEditProfile)}
                    >
                    </div>
                    <div className="edit-profile-wrapper">
                        <div className='edit-profile-container'>
                            <EditProfile setOpenEditProfile={setOpenEditProfile} openEditProfile={openEditProfile} />
                        </div>
                    </div>
                </div>
            }
        </div >
    </>
    )
}
