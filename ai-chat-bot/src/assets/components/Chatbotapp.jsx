import React from 'react';
import './Chatbotapp.css';

const Chatbotapp = () => {
  return (
    <div className="chat-app">
      {/* Chat List Section */}
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        <div className="chat-list-item active">
          <h4>Chat 18/02/2025 16:24 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 18/02/2025 16:24 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>
        <div className="chat-list-item">
          <h4>Chat 18/02/2025 16:24 PM</h4>
          <i className="bx bx-x-circle"></i>
        </div>      
      </div>

      {/* Chat Window Section */}
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow"></i>
        </div>
        <div className="chat">
          <div className="prompt">
            Welcome User, How are you? <span>16:30 PM</span>
          </div>
          <div className="response">
            Hello! I am fine today, how may I help you? <span>16:31 PM</span>
          </div>
        </div>
        <div className="typing">Typing .........</div>

        {/* New Wrapper for the Form */}
        <div className="chat-input-container">
          <form className="msg-form">
            <i className="fa-solid fa-face-smile emoji"></i>
            <input type="text" className="msg-input" placeholder="Type your message"/>
            <i className="fa-solid fa-paper-plane"></i>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbotapp;
