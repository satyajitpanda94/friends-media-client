import React, { useContext } from 'react'
import SharePost from '../sharePost/SharePost'
import './Feed.scss'
import Posts from '../posts/Posts'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Feed() {
  const apiBaseURL = process.env.REACT_APP_API_BASE_URL
  const { user } = useContext(AuthContext)

  const { data: timelinePosts } = useQuery({
    queryKey: ["allposts"],
    queryFn: async () => {
      const res = await axios.get(apiBaseURL + "/post/timeline/" + user._id)
      return res.data
    }
  })

  return (
    <div className='feed-container'>
      <SharePost />
      <Posts posts={timelinePosts} />
    </div>
  )
}
