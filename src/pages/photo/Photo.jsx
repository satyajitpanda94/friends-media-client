import React, { useEffect, useState } from 'react'
import './Photo.scss'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

export default function Photo() {
    const apiBaseURL = process.env.REACT_APP_API_BASE_URL

    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            return await axios.get(`${apiBaseURL}/post/${id}`)
        }

        getPost().then(
            res => setPost(res.data)
        )
    }, [])

    console.log(post)

    return (
        <div className='photo-container'>
            <div className="left-photo-container">
                <Link to={`/profile/${post?.userId}`}>
                    <div className="cancle-photo">
                        <RxCross2 />
                    </div>
                </Link>
                <div className="image-container">
                    <img src={post?.img} alt="" />
                </div>
            </div>
            <div className="right-photo-container">

            </div>
        </div>
    )
}
