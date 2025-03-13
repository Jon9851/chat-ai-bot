import React, { useEffect, useState } from 'react';
import './Chatbotapp.css';

const Chatbotapp = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]); // Ensure messages update correctly when activeChat changes

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return; // Avoid sending empty messages

    const newMessage = {
      type: 'prompt',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue('');

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id); // Filter out the chat
    setChats(updatedChats);

    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
    }
  };

  return (
    <div className="chat-app">
      {/* Chat List Section */}
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat" onClick={onNewChat}></i>
        </div>
        {chats.map((chat) => (
          <div
            key={chat.id} // Using chat.id as the unique key here
            className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
            onClick={() => handleSelectChat(chat.id)}
          >
            <h4>{chat.displayId}</h4> {/* Display the chat's displayId */}
            <i
              className="bx bx-x-circle"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click event
                handleDeleteChat(chat.id); // Pass the correct id
              }}
            ></i>
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
              {message.text} <span>{message.timestamp}</span> {/* Display the timestamp */}
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
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbotapp;
