import React, { useState } from "react";
import "./chatbot.css"; // <-- Import the CSS here

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, fromUser: true }]);
    setInput("");
    // You can add bot responses here later
  };

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle" onClick={toggleChat}>
        💬
      </button>
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.fromUser ? "user-msg" : "bot-msg"}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
