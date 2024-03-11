import React, { useEffect, useRef } from 'react'
import './Chats.scss'

export default function Chats({ chats, recieverUser, currentUser }) {
    const scrollRef = useRef()

    const formateDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.getDate() + '/'
          + date.getMonth() + 1 + '/'
          + date.getFullYear() + ', '
          + (date.getHours() + '').padStart(2, '0') + ':'
          + (date.getMinutes() + '').padStart(2, '0')
      }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [chats])

    return (
        <div className="chats-container">
            {
                chats?.map((chat, indx, arr) => (
                    <div className="chat-container" key={indx} ref={scrollRef}>
                        <div className="date-container">
                            {
                                new Date(arr[indx - 1]?.createdAt).toDateString() !== new Date(chat.createdAt).toDateString() &&
                                <span className='date'>{formateDate(chat.createdAt)}</span>
                            }
                        </div>

                        <div className={
                            chat.senderUserId === currentUser._id ? "chat-info-user" : "chat-info-reciever"
                        }>
                            {
                                chat.senderUserId === recieverUser._id &&
                                <img src={recieverUser.profilePic} alt="" />
                            }
                            <span className='message'>{chat.message}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
