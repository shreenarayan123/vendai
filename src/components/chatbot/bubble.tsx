import React from "react";
import { cn, extractUUIDFromString } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/assets/logo.png";

type Props = {
  message: {
    role: "assistant" | "user";
    content: string;
    link?: string;
  };
  createdAt?: Date;
};

const Bubble = ({ message }: Props) => {
  const image = extractUUIDFromString(message.content);
  console.log(message.link);

  return (
    <div
      className={cn(
        "flex gap-2 items-end",
        message.role == "assistant" ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {message.role == "assistant" ? (
        <Avatar className="w-5 h-5">
          <AvatarImage src={"@/app/assets/logo.png"} alt="logo" />
          <AvatarFallback>
            <Image src={Logo} alt="logo" fill />
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-5 h-5">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "flex flex-col  min-w-[200px] max-w-[300px] p-3 rounded-2xl ",
          message.role == "assistant" ? "bg-white " : "bg-blue-500  text-white"
        )}
      >
        {image ? (
          <div className="relative aspect-square">
            <Image src={`https://ucarecdn.com/${image[0]}/`} fill alt="image" />
          </div>
        ) : (
          <p className="text-sm">
            {message.content.replace("(complete)", " ")}
            {message.link && (
              <Link
                className="underline font-bold pl-2"
                href={message.link}
                target="_blank"
              >
                Your Link
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bubble;
