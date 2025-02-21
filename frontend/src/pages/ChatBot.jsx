
// import React, { useState } from "react";
// import axios from "axios";
// import "./styles.css";

// // ✅ Function to format bot responses
// const formatResponse = (response) => {
//   return response
//     .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>") // Bold + Italic
//     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
//     .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
//     .replace(/~~(.*?)~~/g, "<del>$1</del>") // Strikethrough
//     .replace(/=(.*?) link="(.*?)"/g, '<a href="$2" target="_blank">$1</a>') // Links
//     .replace(/^(#{1,6})\s*(.*?)$/gm, (match, hash, content) => {
//       const level = hash.length; // Headers (h1 - h6)
//       return `<h${level}>${content}</h${level}>`;
//     })
//     .replace(/^\*\s+(.*)$/gm, "<ul><li>$1</li></ul>") // Unordered List
//     .replace(/^1\.\s+(.*)$/gm, "<ol><li>$1</li></ol>") // Ordered List
//     .replace(/```(.*?)```/gs, (match, code) => `<pre><code>${code}</code></pre>`) // Code block
//     .replace(/`(.*?)`/g, (match, code) => `<code>${code}</code>`) // Inline code
//     .replace(/\n+/g, "<p></p>"); // Line breaks
// };

// const App = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       role: "model",
//       content:
//         "Welcome to Agrimitra AI! 🌱 I'm your smart agricultural assistant, here to provide expert advice on farming, crops, weather, and market trends. Ask me anything about agriculture, and I'll help you grow smarter!",
//     },
//   ]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const response = await axios.post("http://localhost:5000/chat", {
//         message: input,
//         history: messages, // Send entire chat history for context
//       });

//       const reply = response.data.reply;

//       setMessages([...newMessages, { role: "model", content: formatResponse(reply) }]);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div id="chatContainer">
//       <div id="chatWindow">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={msg.role === "user" ? "user-message" : "bot-message"}
//             dangerouslySetInnerHTML={{ __html: msg.content }}
//           />
//         ))}
//       </div>
//       <div id="chatForm">
//       <input
//   id="userInput"
//   type="text"
//   value={input}
//   onChange={(e) => setInput(e.target.value)}
//   placeholder="Type a message..."
//   onKeyDown={(e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault(); // Prevent new line
//       sendMessage();
//     } else if (e.key === "Enter" && e.shiftKey) {
//       e.preventDefault(); // Prevent default Enter behavior
//       setInput((prev) => prev + "\n"); // Add new line
//     }
//   }}
// />

//         <button id="sendButton" onClick={sendMessage}>
//           📩
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;


import React, { useState } from "react";
import axios from "axios";
// import "./styles.css";

// ✅ Function to format bot responses
const formatResponse = (response) => {
  return response
    .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>") // Bold + Italic
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
    .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
    .replace(/~~(.*?)~~/g, "<del>$1</del>") // Strikethrough
    .replace(/=(.*?) link="(.*?)"/g, '<a href="$2" target="_blank">$1</a>') // Links
    .replace(/^(#{1,6})\s*(.*?)$/gm, (match, hash, content) => {
      const level = hash.length; // Headers (h1 - h6)
      return `<h${level}>${content}</h${level}>`;
    })
    .replace(/^\*\s+(.*)$/gm, "<ul><li>$1</li></ul>") // Unordered List
    .replace(/^1\.\s+(.*)$/gm, "<ol><li>$1</li></ol>") // Ordered List
    .replace(/```(.*?)```/gs, (match, code) => `<pre><code>${code}</code></pre>`) // Code block
    .replace(/`(.*?)`/g, (match, code) => `<code>${code}</code>`) // Inline code
    .replace(/\n+/g, "<p></p>"); // Line breaks
};

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Welcome to Agrimitra AI! 🌱 I'm your smart agricultural assistant, here to provide expert advice on farming, crops, weather, and market trends. Ask me anything about agriculture, and I'll help you grow smarter!",
    },
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL, {
        message: input,
        history: messages, // Send entire chat history for context
      });

      const reply = response.data.reply;

      setMessages([...newMessages, { role: "model", content: formatResponse(reply) }]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="chatContainer">
      <div id="chatWindow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-message" : "bot-message"}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
      </div>
      <div id="chatForm">
        <input
          id="userInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // Prevent new line
              sendMessage();
            } else if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault(); // Prevent default Enter behavior
              setInput((prev) => prev + "\n"); // Add new line
            }
          }}
        />
        <button id="sendButton" onClick={sendMessage}>
          📩
        </button>
      </div>
    </div>
  );
};

export default ChatBot;