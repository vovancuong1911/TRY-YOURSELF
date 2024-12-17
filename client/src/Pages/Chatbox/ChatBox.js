import React, { useState, useEffect, useRef } from "react";
import { fetchMessages, saveMessage } from "../../services/chatboxService";
import "./ChatBox.css";

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng Chatbox
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn
  const [input, setInput] = useState(""); // Nội dung tin nhắn
  const [userName, setUserName] = useState("Guest"); // Tên người dùng mặc định
  const chatBodyRef = useRef(null); // Tham chiếu để cuộn xuống tin nhắn mới

  // Lấy tin nhắn từ backend khi component được mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages();
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    loadMessages();
  }, []);

  // Hàm gửi tin nhắn
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { sender: userName, text: input };
      setMessages([...messages, newMessage]);

      // Gửi tin nhắn đến backend
      try {
        await saveMessage(userName, input);
      } catch (error) {
        console.error("Failed to save message:", error);
      }

      setInput(""); // Xóa input sau khi gửi

      // Cuộn xuống tin nhắn mới nhất
      setTimeout(() => {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }, 0);
    }
  };

  return (
    <>
      {/* Biểu tượng Chatbox */}
      {!isOpen && (
        <div className="chatbox-icon" onClick={() => setIsOpen(true)}>
          <img
        src="/assets/chatbox-icon.png" // Đường dẫn tuyệt đối từ thư mục public
        alt="Chatbox Icon"
        width="50"
        height="50"
      />
    </div>
      )}

      {/* Nội dung Chatbox */}
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            Chat with us
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
          <div className="chatbox-body" ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === userName ? "user" : "bot"
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-footer">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;
