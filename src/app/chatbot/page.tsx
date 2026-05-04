export const dynamic = 'force-dynamic';
import AiChatBot from "@/components/chatbot";
import React, { Suspense } from "react";

const ChatBot = () => {
  return  <Suspense fallback={<div>Loading chatbot...</div>}>
      <AiChatBot />
    </Suspense>;
};

export default ChatBot;
