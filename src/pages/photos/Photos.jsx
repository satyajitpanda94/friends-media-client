import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './Photos.scss'
import { useQuery } from '@tanstack/react-query'
import { IoPersonSharp } from 'react-icons/io5'

export default function Photos() {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { id: profileId } = useParams()
    const [posts, setPosts] = useState([])

    const { data: profileUser } = useQuery({
        queryKey: ["profileUser", profileId],
        queryFn: async () => {
            const res = await axios.get(`${apiBaseURL}/user/${profileId}`)
            return res.data
        }
    })

    useEffect(() => {

        const getPosts = async () => {
            return await axios.get(apiBaseURL + "/post/profile/" + profileId+"?limit=100")
        }

        getPosts().then(
            res => setPosts(res.data.filter(post => post.img))
        )

    }, [profileId])
    return (
        <div className='photos-container'>
            <div className="photo-gallery-profile-info">
                <Link to={`/profile/${profileUser?._id}`} className="profile-info-container">
                    {
                        profileUser?.profilePic ?
                            <img
                                src={profileUser?.profilePic}
                                alt=""
                            /> :
                            <IoPersonSharp className='avatar' />
                    }

                    <span className="name">
                        {profileUser?.name}
                    </span>
                </Link>
            </div>
            <div className="photo-gallery-container">
                <h2>Photos</h2>
                <div className="photos">
                    {
                        posts.map((post, indx) => (
                            <Link to={`/photo/${post._id}`} key={indx}>
                                <img src={post.img} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
