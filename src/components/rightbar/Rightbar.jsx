import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.scss'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import MayBeFriend from '../mayBeFriend/MayBeFriend'
import FriendRequestFrom from '../friendRequestFrom/FriendRequestFrom'

export default function Rightbar() {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { user } = useContext(AuthContext)
    const [mayBeFriends, setMayBeFriends] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            return await axios.get(`${apiBaseURL}/user/all`)
        }

        getUsers()
            .then(res => setMayBeFriends(
                res.data.filter(mayBeFriend => {
                    return user._id !== mayBeFriend._id && (!user.friends.includes(mayBeFriend._id))
                }))
            )
    }, [])

    return (
        <div className='rightbar-container'>
            <div className="people-you-may-know-container">
                <div className="title">People you may know</div>
                {
                    mayBeFriends &&
                    mayBeFriends.map((mayBeFriend, indx) => (
                        indx < 5 && <MayBeFriend mayBeFriend={mayBeFriend} key={indx} />
                    ))
                }

            </div>

            <hr />

            <div className="friend-request-container">
                <span className='title'>Friend requests</span>
                {
                    user &&
                    user.friendRequestsFrom.map((friendRequestFrom, indx) => (
                        <FriendRequestFrom friendRequestFromId={friendRequestFrom} key={indx} />
                    ))
                }
            </div>
            <hr />
            <div className="contacts-container">
                <span className='title'>Contacts</span>
                <div className="contact">
                    <img
                        src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                    <span className="name">Tony Stark</span>
                </div>
                <div className="contact">
                    <img
                        src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                    <span className="name">Sham Inglish</span>
                </div>
                <div className="contact">
                    <img
                        src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                    <span className="name">Antony Brigenja</span>
                </div>
                <div className="contact">
                    <img
                        src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                    <span className="name">Tom Harish</span>
                </div>
                <div className="contact">
                    <img
                        src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                    />
                    <span className="name">Monty Singh</span>
                </div>
            </div>
        </div >
    )
}
