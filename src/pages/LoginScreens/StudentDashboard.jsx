import React, { useEffect, useState } from "react";
import avatar from "../../assets/LoginScreen/avatar.png";
import profileComletion from "../../assets/LoginScreen/profileCompletion.png";
import StudentDashboardSidebar from "../../components/LoginScreens/StudentDashboardSidebar";
import { Outlet } from "react-router";
import Exams from "../../components/Dashboard/Exams";
import profilePercentage from "../../actions/Dashboard/profilePercentage";
import getStudentProfile from "../../actions/Dashboard/getStudentProfile";

function StudentDashboard() {
  const [profilePercent, setProfilePercent] = useState(null);
  const [studentProfile, setStudentProfile] = useState({});

  const getProfilePercentage = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await profilePercentage(data);
      console.log("Profile Percentage response:", response);
      if (response?.data?.code === 1000)
        setProfilePercent(response?.data?.profile_perc);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  const getProfileData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await getStudentProfile(data);
      console.log("Profile Percentage response:", response);
      if (response?.data?.code === 1000)
        setStudentProfile(response?.data?.profile);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setErrors([error.message]);
    }
  };

  useEffect(() => {
    getProfilePercentage();
    getProfileData();
  }, []);
  return (
    <div className="max-h-screen overflow-hidden flex">
      {/* Left Side */}
      <StudentDashboardSidebar />
      {/* Right Side */}
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-14">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard
          </span>
          <div className="flex  flex-col items-center  w-1/3 justify-between overflow-hidden">
            <div className="flex gap-7 px-1 mt-4">
              <div className="flex items-center gap-2 h-14 border-2 border-[#1C4481] px-1 rounded-[100px] w-1/2">
                <img
                  src={studentProfile.profile_pic}
                  alt=""
                  className="h-10 m-1 rounded-full"
                />
                <div className="flex flex-col text-sm">
                  <span className="font-semibold text-[#305187]">Welcome</span>
                  <span className="font-medium flex">
                    {studentProfile.student_name}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center">
                  <img src={profileComletion} alt="" />
                  <div className="bg-[#1C4481] h-12 w-12 absolute rounded-full"></div>
                  <span className="absolute font-bold text-[#FBFF3C] text-xl">
                    {profilePercent?.length > 0 &&
                      profilePercent[0].score_percentage}
                    %
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-sm">
                <span>Profile</span>
                <span>Completion</span>
              </div>
            </div>

            {profilePercent?.length === 0 && (
              <div className="animate-marquee whitespace-nowrap text-base text-black font-medium">
                Please Complete your profile&nbsp;.It will help you to get
                relevent exams and job recommendation. &nbsp;
              </div>
            )}
            {profilePercent?.length > 0 && (
              <div className="animate-marquee whitespace-nowrap text-base text-black font-medium">
                You have completed your profile{" "}
                <span className="font-bold ">
                  {" "}
                  {profilePercent[0].score_percentage}%
                </span>
                &nbsp;.It will help you to get relevent exams and job
                recommendation. &nbsp;
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen rounded-3xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
