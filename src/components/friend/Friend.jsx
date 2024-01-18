import React, { useEffect, useState } from 'react'
import './Friend.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Friend({ friendId }) {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const [friend, setFriend] = useState(null)

    useEffect(() => {
        const getFriendById = async () => {
            return await axios.get(`${apiBaseURL}/user/${friendId}`)
        }

        getFriendById().then(
            res => setFriend(res.data)
        )
    }, [friendId])

    return (
        <div className="friend-container">
            <Link to={`/profile/${friend?._id}`}>
            <img src={friend?.profilePic} alt="" />
            <span className="friend-name">{friend?.name}</span>
            </Link>
        </div>
    )
}
