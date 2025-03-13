import React, { useState } from 'react';
import ChatbotStart from './assets/components/ChatbotStart';
import Chatbotapp from './assets/components/Chatbotapp';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleStartChat = () => {
    setIsChatting(true);

    if (chats.length === 0) {
      const newChat = {
        id: uuidv4(),  // use uuidv4 to generate a unique id
        displayId: `Chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
        messages: [],
      };
      setChats([newChat]);
      setActiveChat(newChat.id);
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),  // use uuidv4 to generate a unique id
      displayId: `Chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
      messages: [],
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (id) => {
    // Remove the chat with the given ID from the chat list
    const updatedChats = chats.filter((chat) => chat.id !== id);
    setChats(updatedChats);
  
    // If the deleted chat was the active chat, update the active chat
    if (id === activeChat) {
      const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null;
      setActiveChat(newActiveChat);
    }
  };

  return (
    <div className="container">
      {isChatting ? (
        <Chatbotapp 
          onGoBack={handleGoBack} 
          chats={chats} 
          setChats={setChats} 
          activeChat={activeChat} 
          setActiveChat={setActiveChat} 
          onNewChat={createNewChat} 
          handleDeleteChat={handleDeleteChat}  // pass handleDeleteChat to the child component
        />
      ) : (
        <ChatbotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
