import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X } from "lucide-react";
import notificationSound from "./notificationSound1.mp3";
import minimize from "../../assets/Assessor/minimize.png";
import send from "../../assets/Assessor/send.svg";
import pic from "../../assets/Assessor/pic.jpeg";
import time from "../../assets/Assessor/time.svg";

// Socket connection
const socket = io("http://164.52.205.145:5000", {
  transports: ["websocket"],
  debug: true,
});
console.log(socket);

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatEndRef = useRef(null);

  // Create room ID
  const joinChat = JSON.parse(localStorage.getItem("joinChat"));
  console.log(joinChat);
  const assessorId = joinChat.assessor_id;
  const examId = joinChat.exam_id;
  const studentId = joinChat.student_id;
  const roomId = `A${assessorId}E${examId}S${studentId}`;
  console.log(roomId);
  // Join room when chat is opened
  useEffect(() => {
    if (isChatOpen) {
      socket.emit("joinRoom", roomId);
    }
  }, [isChatOpen, roomId]);

  // Listen for messages
  useEffect(() => {
    socket.on("message", (msgJson) => {
      console.log("Received message:", msgJson);
      setMessages((prev) => [...prev, msgJson]);

      if (!isChatOpen) {
        setUnreadCount((prev) => prev + 1);
        new Audio(notificationSound).play();
      }
    });

    return () => {
      socket.off("message");
    };
  }, [isChatOpen]);

  // Send message
  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const msgJson = {
        message: newMessage,
        room: roomId,
        assessor_id: assessorId,
        student_id: studentId,
        exam_id: examId,
        sender: 0, // for student
        chat_type: 3,
      };
      console.log(msgJson);

      console.log("Sending message:", msgJson);
      socket.emit("send", msgJson);
      setMessages((prev) => [...prev, msgJson]);
      setNewMessage("");
    }
    scrollToBottom();
  };

  // Clear chat status when chat is opened
  useEffect(() => {
    if (isChatOpen) {
      const msgJson = {
        room: roomId,
        student_id: studentId,
        exam_id: examId,
        sender: 0, // 0 for student, 1 for assessor
      };

      console.log("Clearing chat status:", msgJson);
      socket.emit("clear status", msgJson);
      setUnreadCount(0);
    }
  }, [isChatOpen, roomId, studentId, examId]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed bottom-5 right-5">
      {isChatOpen ? (
        <div className="bg-white border h-auto border-gray-300 w-80 shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-[#1C4481] text-white px-4 py-2 flex justify-between items-center rounded-t-lg">
            <div className="relative flex justify-center items-center gap-2">
              <img
                src={pic}
                className="rounded-full w-7 h-7 border border-white"
              />
              <div className="absolute top-5 left-5 rounded-full w-2 h-2 bg-green-600"></div>
              <span className="text-sm font-semibold">Ambuj Singh</span>
            </div>
            <div className="flex justify-center items-center gap-2">
              <img src={minimize} className="w-8 h-8" />
              <X
                className="cursor-pointer"
                onClick={() => setIsChatOpen(false)}
              />
            </div>
          </div>

          {/* Chat Messages */}
          {newMessage === "" && messages?.length === 0 && (
            <div className="flex flex-col justify-center items-center py-7">
              <div className="flex flex-col justify-center items-center gap-4">
                <span>Ambuj Singh</span>
                <span className="text-xs text-gray-500">
                  pm@pareekshn.co.in
                </span>
                <span className="text-xs text-gray-500">16:58 GMT +5:30s</span>
                <span className="px-4 text-xs text-gray-500">
                  You created this chat on Wedenesday, 16oct
                </span>
              </div>

              <div className="flex flex-col justify-center items-center py-5">
                <div className="flex gap-2">
                  <img src={time} />
                  <p className="font-medium">HISTORY IS ON</p>
                </div>

                <span className="px-4 text-xs text-gray-500">
                  Messages sent with history turned on are saved
                </span>
              </div>
            </div>
          )}
          {messages?.length > 0 && (
            <div className="p-2 h-64 overflow-y-scroll no-scrollbar">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <div
                    className={`bg-gray-200 text-black p-2 rounded-lg inline-block text-sm ${
                      msg.sender === 0 ? "self-end" : "self-start"
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
          )}

          {/* Input Box */}
          <div className="m-4 flex items-center border-t border px-2 rounded-full hover:border-gray-600">
            <input
              type="text"
              className="flex-1 p-2 rounded-lg text-black outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            {newMessage && (
              <button
                className="text-white py-1 ml-2 rounded-lg"
                onClick={sendMessage}
              >
                <img src={send} className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div
          className="relative bg-[#1C4481] text-white w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => {
            setIsChatOpen(true);
            setUnreadCount(0);
          }}
        >
          <MessageCircle size={28} />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
