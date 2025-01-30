import React, { useState, useEffect } from "react";
import start2 from "../../assets/Assessor/start2.svg";
import { useNavigate } from "react-router";
import Chatbot from "./Chatbot";
import praticalStatus from "../../actions/Exam/praticalStatus";

function ChatPracticalPage() {
  const [vivaExamData, setVivaExamData] = useState({});
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const getVivaExamDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User :: ", user);
      const data = {
        usercode: user,
        assessor_id: 160,
        exam_id: 8558,
        student_id: 211158,
        viva_by: "assessor",
      };
      const response = await vivaExamFetch(data);
      console.log(" Viva Exam Fetch ", response);
      if (response?.data?.code === 1000) setVivaExamData(response?.data);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getPracticalStatusAlert = async () => {
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
      const response = await praticalStatus(data);
      console.log(response);
    } catch (error) {
      console.log("Error in alert", error);
    }
  };

  useEffect(() => {
    getPracticalStatusAlert();
  }, []);

  return (
    <div>
      <div>
        <div className="flex px-12 py-4 justify-between">
          <span className="text-[#0C49CA] text-2xl font-medium font-custom my-2">
            VC
          </span>
        </div>
        <div className="min-h-screen bg-[#F3F7FF] flex flex-col mx-8 px-8 gap-4 border rounded-2xl ">
          <div className="flex items-center justify-between mt-10 w-full">
            <div className="bg-[#DDEAFF] rounded-lg w-full  h-screen flex">
              <div className="w-full gap-4">
                <div className="py-3 flex justify-between w-full px-8">
                  <div className="flex items-center ">
                    <span className="text-[#1C4481] font-semibold">
                      11/12- Level , (MT Nos-3)
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex justify-center items-center border border-[#1C4481] py-1 px-4 rounded-md bg-white font-medium">
                      <span className="font-bold text-[#1C4481]">
                        Max Marks-10
                      </span>
                    </div>
                  </div>
                </div>
                <hr class="border-t-[1px] border-[#bcbcbc]" />
                <div className="flex px-8 justify-between flex-col py-4">
                  <span className="text-black font-bold w-full ">
                    Q-What is python
                  </span>
                </div>
                <div className="flex items-center justify-center gap-10">
                  <div className=" flex items-center justify-center border rounded-2xl w-[829px] h-[465px] bg-white mt-4">
                    <div className=" flex items-center justify-center border rounded-lg w-[784px] h-[355px]  bg-[#353534]">
                      <img src={start2} />
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <div className="border rounded-2xl bg-white w-[373px] h-[86px]">
                      <span className="text-[#1C4481] font-custom mx-10">
                        Enter Marks
                      </span>
                      <div className="flex items-center justify-center mt-3">
                        <button className="border-2  border-[#1C4481] rounded-full bg-white px-20  py-1 ">
                          0-10
                        </button>
                        <button className="border-2 mx-4 text-white rounded-full bg-[#1C4481] px-12 py-2 ">
                          Submite
                        </button>
                      </div>
                    </div>
                    <div className=" flex items-center justify-center border rounded-2xl w-[370px] h-[223px] bg-white mt-4">
                      <div className=" flex items-center justify-center border rounded-lg w-[345px] h-[193px]  bg-[#353534]">
                        <img src={start2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default ChatPracticalPage;
