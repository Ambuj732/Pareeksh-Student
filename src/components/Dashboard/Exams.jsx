import React, { useEffect, useState } from "react";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import practice from "../../assets/Dashboard/practice.png";
import attempted from "../../assets/Dashboard/attempted.png";
import dashboardExamList from "../../actions/MasterDataApi/dashboardExamList";
import { Link } from "react-router-dom";
import StudentExams from "./StudentExams";
import CorporateHackathonDashboard1 from "../Hackathon/CorporateHackathonDashboard1";
import AttemptedExam from "./AttemptedExam";
import Question from "../../pages/Exams/Question";

function Exams() {
  const [showpages, setShowPages] = useState(false);
  const [practiceExam, setPracticeExam] = useState(false);

  return (
    <>
      <div className="bg-[#EDF2FF] min-h-screen rounded-3xl">
        <div className="flex items-center relative flex-col justify-center">
          <div className="left-1/2 transform -translate-y-1/2 border-2 bg-white border-[#1C4481] w-[360px] h-20 rounded-full flex items-center px-2 gap-4">
            <div
              className={`${
                !showpages ? "bg-[#1C4481] text-white" : "pl-8"
              } w-1/2 h-16 rounded-full flex items-center px-2 gap-2`}
              onClick={() => setShowPages(false)}
            >
              {!showpages && <img src={mock} alt="" className="h-10" />}
              <span className="font-semibold cursor-pointer">Exam</span>
            </div>
            <div
              className={`${
                showpages ? "bg-[#1C4481] text-white" : ""
              } w-1/2 h-16 rounded-full flex items-center px-2 gap-2`}
              onClick={() => setShowPages(true)}
            >
              {showpages && <img src={mock} alt="" className="h-10" />}
              <span className="font-semibold cursor-pointer">Hackathon</span>
            </div>
          </div>
          {!showpages && (
            <div className="w-full flex justify-center mb-7 gap-8">
              <div
                className={`${
                  !practiceExam
                    ? "bg-[#1C4481] text-white"
                    : "bg-white text-[#1C4481]"
                } h-12 border-2 rounded-lg justify-center border-[#1C4481] w-52 flex items-center gap-3`}
              >
                <img src={practice} alt="" className="h-8" />
                <span
                  className=" font-medium cursor-pointer"
                  onClick={() => setPracticeExam(false)}
                >
                  Practice Exam
                </span>
              </div>
              <div
                className={`${
                  !practiceExam
                    ? "bg-white text-[#1C4481]"
                    : "bg-[#1C4481] text-white"
                } h-12 border-2 rounded-lg justify-center border-[#1C4481] w-52 flex items-center gap-3`}
              >
                <img src={attempted} alt="" className="h-8" />
                <span
                  className=" font-medium cursor-pointer"
                  onClick={() => setPracticeExam(true)}
                >
                  Attempted Exam
                </span>
              </div>
            </div>
          )}
        </div>
        {!showpages && (
          <>
            {!practiceExam && <StudentExams />}
            {practiceExam && <AttemptedExam />}
          </>
        )}
        {showpages && <CorporateHackathonDashboard1 />}
      </div>
      {/* <Question /> */}
    </>
  );
}

export default Exams;
