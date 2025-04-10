import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

// ✅ Function to format bot responses using Tailwind classes
const formatResponse = (response) => {
  // console.log(response);
  return response
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold italic">$1</strong>') // Bold + Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>') // Italic
    .replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>') // Strikethrough
    .replace(/=(.*?) link="(.*?)"/g, '<a href="$2" target="_blank" class="text-pink-500 hover:text-purple-500 transition-colors duration-300">$1</a>') // Links
    .replace(/^(#{1,6})\s*(.*?)$/gm, (match, hash, content) => {
      const level = hash.length; // Headers (h1 - h6)
      return `<h${level} class="text-${level === 1 ? '3xl' : level === 2 ? '2xl' : level === 3 ? 'xl' : level === 4 ? 'lg' : level === 5 ? 'base' : 'sm'} font-bold my-2">${content}</h${level}>`;
    })
    .replace(/^\*\s+(.*)$/gm, '<ul class="list-disc pl-6 my-2"><li class="mb-1 text-sm leading-relaxed [font-size:15px]">$1</li></ul>') // Unordered List
    .replace(/^1\.\s+(.*)$/gm, '<ol class="list-decimal pl-6 my-2"><li class="mb-1 text-sm leading-relaxed">$1</li></ol>') // Ordered List
    .replace(/\n+/g, '<p class="my-2"></p>'); // Line breaks
};


// nisharg

// const formatResponse = (response) => {
//   return response
//     .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
//     .replace(/\*(.*?)\*/g, "<em>$1</em>")
//     .replace(/~~(.*?)~~/g, "<del>$1</del>")
//     .replace(/=(.*?) link="(.*?)"/g, '<a href="$2" target="_blank">$1</a>')
//     .replace(/\n+/g, "<p></p>");
// };

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Welcome to Agrimitra AI! 🌱 I'm your smart agricultural assistant, here to provide expert advice on farming, crops, weather, and market trends. Ask me anything about agriculture, and I'll help you grow smarter!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chatBot/chat`,
        {
          message: input,
          history: messages,
        }
      );

      const reply = response.data.data.reply;
      setMessages([
        ...newMessages,
        { role: "model", content: formatResponse(reply) },
      ]);
    } catch (error) {
      // console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen  bg-gray-100 p-5">
      <div className=" h-5/6 bg-white shadow-lg rounded-lg border border-gray-300 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mt-5 p-5 rounded-lg max-w-[55%] ${
                msg.role === "user"
                  ? "bg-green-600 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-900"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          ))}
          {loading && (
            <p className="text-gray-500 text-center mt-2">
              ⏳ Generating response...
            </p>
          )}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t border-gray-300 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              } else if (e.key === "Enter" && e.shiftKey) {
                setInput((prev) => prev + "\n");
              }
            }}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            className={`bg-green-600 text-white px-5 py-3 rounded-r-lg hover:bg-green-700 transition-all flex items-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
