import React, { useContext, useState } from 'react'
import './MayBeFriend.scss'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'

export default function MayBeFriends({ mayBeFriend }) {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL
    const { user, setUser } = useContext(AuthContext)
    const [friendRequestsSent, setFriendRequestSent] = useState(user.friendRequestsSent.includes(mayBeFriend._id))

    const sendFriendRequest = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${apiBaseURL}/user/${user._id}/add-friend-request`, { friendRequestTo: mayBeFriend._id })
        setUser(pre => { return { ...pre, friendRequestsSent: [...pre.friendRequestsSent, mayBeFriend._id] } })
        setFriendRequestSent(!friendRequestsSent)
    }

    const cancleFriendRequest = async (e) => {
        e.preventDefault()
        const res = await axios.put(`${apiBaseURL}/user/${user._id}/cancle-friend-request`, { friendRequestTo: mayBeFriend._id })
        setUser(pre => {
            const friendRequestsSent = pre.friendRequestsSent.filter(friendRequestTo => friendRequestTo !== mayBeFriend._id)
            return { ...pre, friendRequestsSent }
        })
        setFriendRequestSent(!friendRequestsSent)
    }

    return (
        <div className="may-be-friend-container">
            <Link to={`/profile/${mayBeFriend._id}`}>
                <div className="left-container">
                    <img
                        src={mayBeFriend.profilePic ? mayBeFriend.profilePic : "/avatar.png"}
                        alt="profile pic"
                    />
                    <span className="name">
                        {mayBeFriend.name}
                    </span>
                </div>
            </Link>
            <div className="right-container">
                {
                    friendRequestsSent
                        ? (<div className="button-container">
                            <div
                                className="cancle"
                                onClick={e => cancleFriendRequest(e)}
                            >Cancle</div>
                        </div>)
                        : (<div className="button-container">
                            <div
                                className="add-friend"
                                onClick={e => sendFriendRequest(e)}
                            >Add Friend</div>
                        </div>)
                }
            </div>
        </div>
    )
}
