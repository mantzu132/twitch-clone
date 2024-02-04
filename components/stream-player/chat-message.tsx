"use client";
import { format } from "date-fns";
import stringToColor from "string-to-color";
import { ReceivedChatMessage } from "@livekit/components-core";

interface ChatMessageProps {
  message: ReceivedChatMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const formattedTime = format(new Date(message.timestamp), "HH:mm");

  const color = message.from?.name ? stringToColor(message.from.name) : "gray";

  return (
    <div className="flex items-center space-x-2 p-2 hover:bg-white/5 text-wrap text-ellipsis">
      <span className="text-sm text-gray-500">{formattedTime}</span>
      <div className="flex flex-wrap items-baseline gap-1 ">
        <span className="font-semibold" style={{ color }}>
          {message.from?.name || "Anonymous"}
        </span>
        :<p className="text-sm break-all ">{message.message}</p>
      </div>
    </div>
  );
};
