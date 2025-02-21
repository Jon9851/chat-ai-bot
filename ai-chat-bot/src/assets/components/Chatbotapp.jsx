import React, { useState } from 'react';
import './Chatbotapp.css';

const Chatbotapp = ({ onGoBack, chats, setChats }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return; // Fixed trim() check

    const newMessage = {
      type: 'prompt',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue('');

    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updatedMessages };
      }
      return chat; // Fixed 'chat' instead of 'chats' in return
    });
    setChats(updatedChats);
  };

  return (
    <div className="chat-app">
      {/* Chat List Section */}
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        {chats.map((chat, index) => (
          <div key={index} className={`chat-list-item ${index === 0 ? 'active' : ''}`}>
            <h4>{chat.id}</h4>
            <i className="bx bx-x-circle"></i>
          </div>
        ))}
      </div>

      {/* Chat Window Section */}
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((message, index) => (
            <div key={index} className={message.type === 'prompt' ? 'prompt' : 'response'}>
              {message.text} <span>{message.timestamp}</span>
            </div>
          ))}
        </div>
        <div className="typing">Typing .........</div>

        {/* New Wrapper for the Form */}
        <div className="chat-input-container">
          <form
            className="msg-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <i className="fa-solid fa-face-smile emoji"></i>
            <input
              type="text"
              className="msg-input"
              placeholder="Type your message"
              value={inputValue}
              onChange={handleInputChange}
            />
            <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbotapp;
