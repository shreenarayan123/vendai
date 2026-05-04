"use client";
import { useChatBot } from "@/hooks/chabot/use-chatbot";
import React from "react";
import { BotWindow } from "./window";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BotIcon } from "@/icons/bot-icon";



const AiChatBot = () => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot();

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          domainName={currentBot?.name!}
          ref={messageWindowRef}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )}
      <div
        className={cn(
          "rounded-full relative cursor-pointer shadow-md w-16 h-16 flex items-center justify-center bg-black",
          loading ? "invisible" : "visible"
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/`}
            className="rounded-full cursor-pointer"
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
  );
};

export default AiChatBot;
