import React, { useEffect, useState } from 'react';
import './Chatbotapp.css';

const Chatbotapp = ({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(chats[0]?.messages || []);
  const [loading, setLoading] = useState(false); // Track loading state for "typing..."

  // Effect to update messages when the active chat changes
  useEffect(() => {
    const activeChatObj = chats.find((chat) => chat.id === activeChat);
    setMessages(activeChatObj ? activeChatObj.messages : []);
  }, [activeChat, chats]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Send message to OpenAI API
  const sendMessage = async () => {
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

    // Set loading state to true while waiting for response
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Access environment variable
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: inputValue }],
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`API Error: ${errorDetails.error.message}`);
      }

      const data = await response.json();
      const chatResponse = data.choices[0].message.content.trim();

      const newResponse = {
        type: 'response',
        text: chatResponse,
        timestamp: new Date().toLocaleTimeString(),
      };

      const updatedMessagesWithResponse = [...updatedMessages, newResponse];
      setMessages(updatedMessagesWithResponse);

      const updatedChatsWithResponse = chats.map((chat) => {
        if (chat.id === activeChat) {
          return { ...chat, messages: updatedMessagesWithResponse };
        }
        return chat;
      });
      setChats(updatedChatsWithResponse);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      // Set loading to false when done
      setLoading(false);
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Select a specific chat
  const handleSelectChat = (id) => {
    setActiveChat(id);
  };

  // Delete a specific chat
  const handleDeleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);
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
            key={chat.id}
            className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`}
            onClick={() => handleSelectChat(chat.id)}
          >
            <h4>{chat.displayId}</h4>
            <i
              className="bx bx-x-circle"
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click event
                handleDeleteChat(chat.id);
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
              {message.text} <span>{message.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Show typing indicator */}
        {loading && <div className="typing">Typing .........</div>}

        {/* Input Section */}
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
