"use client";
import { useConversation } from "@/hooks/conversation/use-conversation";
import React from "react";
import ConversationSearch from "./search";
import { Loader } from "../loader";
import ChatCard from "./chat-card";
import { CardDescription } from "../ui/card";
import EmailIcon from "@/icons/email-icon";

type Props = {
  domains?:
    | {
        name: string;
        id: string;
        icon: string;
      }[]
    | undefined;
};

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation();

  return (
    <div className="py-3 pl-3 md:h-auto h-0 w-[500px] md:overflow-auto ">
      <div>
        <div className="bg-slate-100 rounded-xl flex items-center gap-2 p-2 w-[90px]">
          <span>Chats</span>
          <span>
            <EmailIcon />
          </span>
        </div>
        <ConversationSearch domains={domains} register={register} />
        <div className="flex flex-col">
          <Loader loading={loading}>
            {chatRooms.length ? (
              chatRooms.map((room) => (
                <ChatCard
                  seen={room.chatRoom[0].message[0]?.seen}
                  id={room.chatRoom[0].id}
                  onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                  createdAt={room.chatRoom[0].message[0]?.createdAt}
                  key={room.chatRoom[0].id}
                  title={room.email!}
                  description={room.chatRoom[0].message[0]?.message}
                />
              ))
            ) : (
              <CardDescription>No chats for you domain</CardDescription>
            )}
          </Loader>
        </div>
      </div>
    </div>
  );
};

export default ConversationMenu;
