import React from "react";
import ChatBot, { Button, Flow } from "react-chatbotify";
import { callGeminiAPI } from "../../hooks/gemini";

function ChatbotWrapper() {
  const settings = {
    general: {
      primaryColor: "#2575fc",
      secondaryColor: "#6a11cb",
      fontFamily: "Arial, sans-serif",
      floating: true,
      showFooter: false,
    },
    audio: {
      disabled: false,
    },
    chatHistory: {
      display: false,
    },
    header: {
      title: "ESbot",
      buttons: [Button.CLOSE_CHAT_BUTTON],
    },
  };

  const styles = {
    headerStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
      color: "#ffffff",
      padding: "10px",
    },
    chatWindowStyle: {
      backgroundColor: "#f2f2f2",
    },
    sendButtonStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    botOptionHoveredStyle: {
      background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    tooltipStyle: {
      display: "none",
    },
    chatButtonStyle: {
      width: "50px",
      height: "50px",
    },
  };

  const flow = {
    start: {
      message: "Chào bạn 🥳! Hãy hỏi tôi bất cứ điều gì.",
      path: "ai_response",
    },
    ai_response: {
      message: async (params) => {
        const userQuestion = params.userInput;
        const response = await callGeminiAPI(userQuestion);
        return response;
      },
      path: "ai_response",
    },
  };

  return <ChatBot styles={styles} settings={settings} flow={flow} />;
}

export default ChatbotWrapper;
