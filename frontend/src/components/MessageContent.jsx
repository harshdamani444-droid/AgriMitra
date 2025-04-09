import React, { useEffect, useRef } from "react";

function MessageContent({ allMessages, user }) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(90vh-14rem)]">
      {allMessages.map((message, index) => {
        const isCurrentUser = message.sender._id === user._id;
        const isSameSender =
          index > 0 && allMessages[index - 1].sender._id === message.sender._id;

        return (
          <div
            key={message._id}
            className={`flex ${
              isCurrentUser ? "justify-end" : "justify-start"
            } items-end space-x-2 `}
          >
            <div>
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div
              className={`${
                isCurrentUser
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-900"
              } rounded-lg px-4 py-2 max-w-[70%] ${
                isSameSender ? "mt-1" : "mt-4"
              }`}
            >
              {!isSameSender && (
                <>
                  <p className="text-xs text-black mb-1">
                    {message.sender.name}{" "}
                  </p>
                </>
              )}
              <p>{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  isCurrentUser ? "text-green-100" : "text-gray-500"
                }`}
              >
                {new Date(message.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageContent;
