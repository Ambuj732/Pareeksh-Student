import React, { useState, useRef } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import Webcam from "react-webcam";
import joinChatVC from "../../actions/LoginScreens/joinChatVC";
import { useNavigate } from "react-router";

const PracticalWelocme = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const joinChat = async () => {
    try {
      const joinChat = JSON.parse(localStorage.getItem("joinChat"));
      console.log("Joinchat::", joinChat);
      const data = {
        usercode: joinChat.usercode,
        exam_id: joinChat.exam_id,
        student_id: joinChat.student_id,
        practical_id: joinChat.practical_id,
      };
      console.log(data);
      const response = await joinChatVC(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        const session = response?.data?.feed.session;
        const token = response?.data?.feed.token;
        if (session != "" && token != "") {
          navigate("/chat-practical-page");
        }
      }
    } catch (error) {
      console.log("Error in Joining", error);
    }
  };
  return (
    <div className="bg-[#d8f9f9] h-screen flex justify-center items-center gap-10">
      <div className="w-80 bg-[#cacece]  rounded-3xl right-64 border h-52 p-4 flex flex-col justify-center items-center">
        <div className="w-full h-52 relative rounded-md overflow-hidden border border-gray-300">
          {/* <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "environment",
            }}
            className="absolute inset-0 w-full h-52"
          /> */}
        </div>
      </div>
      <button
        onClick={joinChat}
        className="bg-[#1C4481] text-white px-10 py-1 rounded-full"
      >
        Join now
      </button>
    </div>
  );
};

export default PracticalWelocme;
