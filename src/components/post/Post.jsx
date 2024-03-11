import React, { useContext, useEffect, useState } from 'react'
import './Post.scss'
import { FaComments } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import Comments from '../comments/Comments';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';
import { format } from 'timeago.js';
import { MdMoreHoriz } from "react-icons/md";
import { IoPersonSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL
    const { user } = useContext(AuthContext)
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [postBy, setPostBy] = useState(null)
    const [moreOpen, setMoreOpen] = useState(false)

    const handleLike = () => {
        try {
            axios.put(apiBaseURL + '/post/' + post._id + '/like', { userId: user._id })
            setTotalLikes(isLiked ? totalLikes - 1 : totalLikes + 1)
            setIsLiked(!isLiked)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeletePost = async () => {
        try {
            await axios.delete(apiBaseURL + '/post/' + post._id, { data: { userId: user._id } })
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setIsLiked(post?.likes.includes(user?._id))
        setTotalLikes(post?.likes.length)
    }, [post, user])

    useEffect(() => {
        const getPostByUser = async () => {
            return await axios.get(`${apiBaseURL}/user/${post.userId}`)
        }

        getPostByUser()
            .then(res => setPostBy(res.data))
    }, [post.userId])

    return (
        <div className='post-container'>
            <div className="post-top">
                <Link to={`/profile/${postBy?._id}`}>
                    <div className="post-top-left">
                        {
                            postBy?.profilePic ?
                                <img
                                    src={postBy?.profilePic}
                                    alt=""
                                /> :
                                <IoPersonSharp className='avatar' />
                        }
                        <div className="post-top-user-info">
                            <span className='name'>{postBy?.name}</span>
                            <span>{format(post.createdAt)}</span>
                        </div>
                    </div>
                </Link>
                <div className="post-top-right">
                    {
                        user._id === post.userId &&
                        <MdMoreHoriz
                            className='more'
                            onClick={() => setMoreOpen(!moreOpen)}
                        />
                    }
                    {
                        moreOpen &&
                        <div className="more-options">
                            <span onClick={handleDeletePost}>Delete Post</span>
                        </div>
                    }
                </div>
            </div>
            <div className="post-middle">
                {
                    post.description &&
                    <div className='description'>{post.description}</div>
                }
                {
                    post.img &&
                    (<Link to={`/photo/${post._id}`}>
                        <img src={post.img} alt="" />
                    </Link>)
                }
            </div>
            <div className="post-buttom">
                <div className="likes" onClick={handleLike}>
                    <BiSolidLike className={isLiked ? 'liked-icon' : 'disLiked-icon'} />
                    <span>{totalLikes} Like</span>
                </div>
                <div className="comments" onClick={() => setCommentsOpen(!commentsOpen)}>
                    <FaComments className='comments-icon' />
                    <span>Comments</span>
                </div>
            </div>
            {
                commentsOpen &&
                <div className='comments-wrapper'>
                    <Comments postId={post._id} />
                </div>
            }
        </div>
    )
}
