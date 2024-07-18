import React, { useState, useEffect } from "react";
import avatar from "/avatar.png";
import { format } from "date-fns";

import profileComletion from "/profileCompletion.png";
// import CorporateHackathonSidebar from "../CorporateHackathonSidebar";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import topad from "../../assets/Hackathon/topad.png";
import social from "../../assets/Hackathon/social.png";
import paid from "../../assets/Hackathon/paid.png";
import free from "../../assets/Hackathon/free.png";
import hackathon from "../../assets/Hackathon/hackathon.png";
import date from "../../assets/Hackathon/date.png";
import sector from "../../assets/Hackathon/sector.png";
import location from "../../assets/Hackathon/location.png";
import level from "../../assets/Hackathon/level.png";
import bottom from "../../assets/Hackathon/bottom.png";
import LeaderBoard from "../Dashboard/LeaderBoard";
import { Outlet } from "react-router";
import hackthonStudentDashboardStatistics from "../../actions/Hackthon/hackthonStudentDashboardStatistics";
import newHackathonList from "../../actions/Hackthon/newHackathonList";
import enrolledHackathonList from "../../actions/Hackthon/enrolledHackathonList";

function CorporateHackathonDashboard1() {
  const [studentDashboard, setStudentDashboard] = useState({});
  const [hackathonList, setHackathonList] = useState([]);
  const [enrolledHackthon, setEnrolledHackthon] = useState([]);
  const [view, setView] = useState("new");
  const [errors, setErrors] = useState([]);

  const getEnrolledHackathonList = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await enrolledHackathonList(data);
      if (response?.data?.code === 1000)
        setEnrolledHackthon(response?.data?.enrolled_exams);
      console.log("Enrolled Hackathon response:", response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getHackathonStudentDashboardStatistics = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await hackthonStudentDashboardStatistics(data);
      if (response?.data?.code === 1000)
        setStudentDashboard(response?.data?.hackathon_detail);
      console.log(response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getNewHackathonList = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await newHackathonList(data);
      if (response?.data?.code === 1000)
        setHackathonList(response?.data?.new_exams);
      console.log("newHacathon list :", response);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getHackathonStudentDashboardStatistics();
    getNewHackathonList();
    getEnrolledHackathonList();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MM/dd/yyyy, hh:mm a");
  };

  return (
    <div className="h-screen flex items-start mx-4 justify-around overflow-hidden">
      <div className="w-2/3 overflow-y-scroll no-scrollbar">
        <div className="bg-[#EDF2FF] min-h-screen rounded-3xl">
          <div className="flex">
            <div className="w-full h-fit flex flex-col gap-4">
              <div className="flex justify-between items-center gap-10">
                <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 w-[300px] h-28 rounded-xl flex justify-between px-4 py-2">
                  <div className="w-1/4 h-1/6 flex flex-col gap-2">
                    <img src={social} alt="" />
                    <div className="flex flex-col text-sm font-medium text-white">
                      <span>Total</span>
                      <span>Hackathon</span>
                    </div>
                  </div>
                  <div className="flex items-center w-1/3 justify-center">
                    <span className="text-3xl text-white font-medium">
                      {studentDashboard?.total_hackathon}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-teal-600 w-[300px] h-28 rounded-xl flex justify-between px-4 py-2">
                  <div className="w-1/4 h-1/6 flex flex-col gap-2">
                    <img src={free} alt="" />
                    <div className="flex flex-col text-sm font-medium text-white">
                      <span>Attempted</span>
                      <span>Hackathon</span>
                    </div>
                  </div>
                  <div className="flex items-center w-1/3 justify-center">
                    <span className="text-3xl text-white font-medium">
                      {studentDashboard?.attempted_hackathon}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-[300px] h-28 rounded-xl flex justify-between px-4 py-2">
                  <div className="w-1/2 h-1/6 flex flex-col gap-2">
                    <img src={paid} alt="" className="w-1/2" />
                    <div className="flex flex-col text-sm font-medium text-white">
                      <span>Paid</span>
                      <span>Hackathon</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-1/3">
                    <span className="text-3xl text-white font-medium">
                      {studentDashboard?.paid_hackathon}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <div className="flex items-center gap-8 mx-auto w-full mb-6 justify-center">
                  <div
                    className={`w-fit border ${
                      view === "new"
                        ? "bg-[#1C4481] text-white"
                        : "border-[#1C4481] bg-white text-[#1C4481]"
                    } py-1 px-4 rounded-lg font-sm cursor-pointer`}
                    onClick={() => setView("new")}
                  >
                    New Hackathon
                  </div>
                  <div
                    className={`w-fit border ${
                      view === "enrolled"
                        ? "bg-[#1C4481] text-white"
                        : "border-[#1C4481] bg-white text-[#1C4481]"
                    } py-1 px-4 rounded-lg font-sm cursor-pointer`}
                    onClick={() => setView("enrolled")}
                  >
                    Enrolled Hackathon
                  </div>
                  <div
                    className={`w-fit border ${
                      view === "completed"
                        ? "bg-[#1C4481] text-white"
                        : "border-[#1C4481] bg-white text-[#1C4481]"
                    } py-1 px-4 rounded-lg font-sm cursor-pointer`}
                    onClick={() => setView("completed")}
                  >
                    Completed Hackathon
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  {view === "new" && (
                    <>
                      {hackathonList.length === 0 ? (
                        <p className="text-center text-[#1C4481]">
                          No new hackathons available.
                        </p>
                      ) : (
                        hackathonList.map((list) => (
                          <div className="w-full h-fit bg-white rounded-3xl">
                            <div className="flex h-1/2 items-center justify-between p-6">
                              <div className="flex w-2/3 gap-2">
                                <img
                                  src={hackathon}
                                  alt=""
                                  className="h-1/3 w-1/3"
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold text-[#1C4481] text-lg">
                                    {list.title}
                                  </span>
                                  <span className="text-sm text-[#1C4481] font-medium">
                                    {list.category}
                                  </span>
                                  <span className="text-sm text-[#7B7B7B]">
                                    Level-{list.level}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-white">
                                    {list.isFree ? "Free" : "Paid"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr className="border-t-[1px] border-[#1C4481]" />
                            <div className="flex justify-between p-6 text-[#1C4481]">
                              <div className="flex items-center gap-2">
                                <img src={date} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Date & Time</span>
                                  <span className="font-semibold">
                                    {formatDate(list.date_of_exam)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={sector} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Sector</span>
                                  <span className="font-semibold">
                                    {list.sector}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={location} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Location</span>
                                  <span className="font-semibold">
                                    {list.location}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={level} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Level</span>
                                  <span className="font-semibold">
                                    {list.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}
                  {view === "enrolled" && (
                    <>
                      {enrolledHackthon.length === 0 ? (
                        <p className="text-center text-[#1C4481]">
                          No enrolled hackathons.
                        </p>
                      ) : (
                        enrolledHackthon.map((list) => (
                          <div className="w-full h-fit bg-white rounded-3xl">
                            <div className="flex h-1/2 items-center justify-between p-6">
                              <div className="flex w-2/3 gap-2">
                                <img
                                  src={hackathon}
                                  alt=""
                                  className="h-1/3 w-1/3"
                                />
                                <div className="flex flex-col">
                                  <span className="font-semibold text-[#1C4481] text-lg">
                                    {list.title}
                                  </span>
                                  <span className="text-sm text-[#1C4481] font-medium">
                                    {list.category}
                                  </span>
                                  <span className="text-sm text-[#7B7B7B]">
                                    Level-{list.level}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
                                <div className="flex items-center gap-2">
                                  <span className="text-white">
                                    {list.isFree ? "Free" : "Paid"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr className="border-t-[1px] border-[#1C4481]" />
                            <div className="flex justify-between p-6 text-[#1C4481]">
                              <div className="flex items-center gap-2">
                                <img src={date} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Date & Time</span>
                                  <span className="font-semibold">
                                    {formatDate(list.date_of_exam)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={sector} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Sector</span>
                                  <span className="font-semibold">
                                    {list.sector}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={location} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Location</span>
                                  <span className="font-semibold">
                                    {list.location}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <img src={level} alt="" className="h-8" />
                                <div className="flex flex-col text-[12px]">
                                  <span>Level</span>
                                  <span className="font-semibold">
                                    {list.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </>
                  )}
                </div>
                <img src={bottom} alt="" className="mt-2" />
              </div>
            </div>
            {/* <LeaderBoard /> */}
            <Outlet />
          </div>
        </div>
      </div>
      <div className="w-1/3 mx-4 h-full rounded-2xl">
        <LeaderBoard />
      </div>
    </div>
  );
}

export default CorporateHackathonDashboard1;
