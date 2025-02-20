import React, { useState } from 'react';
import ChatbotStart from './assets/components/ChatbotStart';
import Chatbotapp from './assets/components/Chatbotapp';

const App = () => {
  // Fixed the typo: 'false' instead of 'flase'
  const [isChatting, setIsChatting] = useState(false);

  const handleStartChat = () => {
    setIsChatting(true);
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  /* Allows the app to determine what page needs to show to the user */
  return (
    <div className="container">
      {isChatting ? (
        <Chatbotapp onGoBack={handleGoBack} /> /* Fixed function name 'handleGoBack' */
      ) : (
        <ChatbotStart onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default App;
