import React, { useState } from 'react';
import ChatbotStart from './assets/components/ChatbotStart';
import Chatbotapp from './assets/components/Chatbotapp';

const App = () => {
  // Fixed the typo: 'false' instead of 'flase'
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState ([])

  const handleStartChat = ()=> {
    setIsChatting(true)

    if(chats.length === 0){
      const newChat ={
        id:`chat ${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString()}`,
        messages:[]
      }
      setChats([newChat]);
    }
  }


  const handleGoBack = () => {
    setIsChatting(false);
  };

  /* Allows the app to determine what page needs to show to the user */
  return (
    <div className="container">
      {isChatting ? (
        <Chatbotapp onGoBack={handleGoBack} chats={chats} setChats={setChats} /> /* Fixed function name 'handleGoBack' */
      ) : (
        <ChatbotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
