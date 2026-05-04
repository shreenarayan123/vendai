import { ChatBotMessageProps } from "@/schemas/conversation.schema";
import React, { forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RealTimeMode from "./real-time";
import Image from "next/image";
import Bubble from "./bubble";
import { Responding } from "./responding";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Paperclip, Send } from "lucide-react";
import { Label } from "../ui/label";
import Logo from "@/app/assets/logo.png";

type Props = {
  errors: any;
  register: UseFormRegister<ChatBotMessageProps>;
  chats: { role: "assistant" | "user"; content: string; link?: string }[];
  onChat(): void;
  onResponding: boolean;
  domainName: string;
  theme?: string | null;
  textColor?: string | null;
  help?: boolean;
  realtimeMode:
    | {
        chatroom: string;
        mode: boolean;
      }
    | undefined;
  setChat: React.Dispatch<
    React.SetStateAction<
      {
        role: "user" | "assistant";
        content: string;
        link?: string | undefined;
      }[]
    >
  >;
};

export const BotWindow = forwardRef<HTMLDivElement, Props>(
  (
    {
      errors,
      register,
      chats,
      onChat,
      onResponding,
      domainName,
      realtimeMode,
      setChat,
      textColor,
      theme
    },
    ref
  ) => {
    console.log(errors);
    return (
      <div className="h-[510px] z-100 w-[400px] absolute top-30 flex flex-col rounded-xl mr-[80px] border-[1px] overflow-hidden pb-4 bg-gradient-to-b from-slate-50 via-blue-50 to-blue-100">
        <div className="flex justify-between px-4 pt-4">
          <div className="flex gap-2 pb-1">
            <Avatar className="w-8 h-8">
              <AvatarImage src={"@/app/assets/logo.png"} alt="logo" />
              <AvatarFallback>
                <Image src={Logo} alt="logo" fill />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-start">
              <div className="flex items-start flex-col">
                <h3 className="text-lg font-bold leading-none">Echo</h3>
                <p className="text-sm">{domainName.split(".com")[0]}</p>
              </div>
              {realtimeMode?.mode && (
                <RealTimeMode
                  setChats={setChat}
                  chatRoomId={realtimeMode.chatroom}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full">
          <div
            style={{
              background: theme || "",
              color: textColor || "",
            }}
            className="px-3 flex h-[350px] flex-col py-5 gap-3 chat-window overflow-y-auto"
            ref={ref}
          >
            {chats.map((chat, key) => (
              <Bubble key={key} message={chat} />
            ))}
            {onResponding && <Responding />}
          </div>
          <form onSubmit={onChat} className="flex px-3 py-1 flex-col ">
            <div className="flex justify-between px-3 gap-2 items-center">
              <Input
                {...register("content")}
                placeholder="Type your message..."
                className="focus-visible:ring-0 flex-1 p-0 focus-visible:ring-offset-0 bg-porcelain rounded-3xl px-2 outline-none border-none"
              />
              <Button type="submit" className="py-1 rounded-3xl">
                <Send />
              </Button>
            </div>
            <Label htmlFor="bot-image">
              <Paperclip />
              <Input
                {...register("image")}
                type="file"
                id="bot-image"
                className="hidden"
              />
            </Label>
          </form>
        </div>
        <div className="flex justify-center ">
          <p className="text-black text-xs">Powered by Vend AI</p>
        </div>
      </div>
    );
  }
);

BotWindow.displayName = "BotWindow";
