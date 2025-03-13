import React, { useState } from 'react';
import ChatbotStart from './assets/components/ChatbotStart';
import Chatbotapp from './assets/components/Chatbotapp';

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const handleStartChat = () => {
    setIsChatting(true);

    if (chats.length === 0) {
      const newChat = {
        id: `chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
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
      id: `chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
      messages: [],
    };
    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setActiveChat(newChat.id);
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
        />
      ) : (
        <ChatbotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
