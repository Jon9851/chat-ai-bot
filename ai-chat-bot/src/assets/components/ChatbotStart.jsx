import React from 'react'
import './Chatbotstart.css'
const ChatbotStart = ({onStartChat}) => {
  return (
    <div classname="start-page">
        <button className="start-page-btn" onClick=
        {onStartChat}>Chat AI</button>


    </div>
  )
}

export default ChatbotStart