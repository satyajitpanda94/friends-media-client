import React, { useContext, useEffect, useState } from 'react'
import './FriendRequestFrom.scss'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

export default function FriendRequestFrom({friendRequestFromId}) {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { user,setUser } = useContext(AuthContext)
    const [friendRequestFrom,setFriendRequestFrom]= useState(null)
    const queryClient = useQueryClient()


    const confirmFriendRequest = async (e) => { 
        e.preventDefault()
        await axios.put(`${apiBaseURL}/user/${user._id}/make-friend`, { friendRequestFrom: friendRequestFromId })
        setUser(pre=>{
            const friendRequestsFrom = pre.friendRequestsFrom.filter(friendRequestFrom => friendRequestFrom !== friendRequestFromId)
            return { ...pre, friendRequestsFrom, friends:[friendRequestFromId] }
        })
        await queryClient.invalidateQueries({ queryKey: ['allposts'] })
     }

    const deleteFriendRequest = async (e) => {
        e.preventDefault()
        await axios.put(`${apiBaseURL}/user/${friendRequestFromId}/cancle-friend-request`, { friendRequestTo: user._id })
        setUser(pre => {
            const friendRequestsFrom = pre.friendRequestsFrom.filter(friendRequestFrom => friendRequestFrom !== friendRequestFromId)
            return { ...pre, friendRequestsFrom }
        })
    }

    useEffect(()=>{
        const getUserById = async() => { 
            return await axios.get(`${apiBaseURL}/user/${friendRequestFromId}`)
         }

         getUserById().then(
            res=>setFriendRequestFrom(res.data)
         )
    },[friendRequestFromId])

    return (
        <div className="friend-request-from-container">
            <div className="right-container">
                <img
                    src={friendRequestFrom?.profilePic}
                    alt=""
                />
            </div>
            <div className="left-container">
                <span className="name">
                    {friendRequestFrom?.name}
                </span>
                <div className="button-container">
                    <div className="confirm-button" onClick={confirmFriendRequest}>Confirm</div>
                    <div className="delete-button" onClick={deleteFriendRequest}>Delete</div>
                </div>
            </div>
        </div>
    )
}
