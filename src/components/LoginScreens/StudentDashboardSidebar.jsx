import React, { useEffect, useState } from "react";
import dashboard from "../../assets/LoginScreen/Dashboard.png";
import user from "../../assets/LoginScreen/userDashboard.png";
import stat from "../../assets/LoginScreen/Stat.png";
import signout from "../../assets/LoginScreen/signout.png";
import leftBanner from "../../assets/LoginScreen/leftBanner.png";
import transition from "../../assets/Dashboard/transition.png";
import logo from "../../assets/logo/pareekshn_logo.png";
import angleUp from "../../assets/Dashboard/angleUp.png";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../actions/LoginScreens/logout";
import { useDispatch } from "react-redux";
import { pushStudentProfile } from "../../store/studentProfileSlice";
import { login as authLogin } from "../../store/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentDashboardSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    if (user) dispatch(authLogin(user));
    const studentProfile = JSON.parse(localStorage.getItem("student_profile"));
    if (studentProfile) dispatch(pushStudentProfile(studentProfile));
  }, []);

  const logoutHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
      };
      console.log(data);
      const response = await logout(data);
      if (response?.data?.code === 1000) {
        toast.success("You have successfully logout");
        localStorage.removeItem("ps_loguser");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log("Error while logging out user :: ", user);
    }
  };

  return (
    <div className="bg-[#2F5185] -h-screen w-1/5 flex flex-col justify-between overflow-y-scroll no-scrollbar">
      <div>
        <img src={logo} alt="" className="h-20" />
        <div className="py-4 flex flex-col">
          <Link to={"/dashboard/exams"}>
            <div
              className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full bg-white text-[#1C4481] gap-2 py-2 px-4"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMenuOpen2(false);
              }}
            >
              <img src={dashboard} alt="" />
              <span className="font-semibold">Dashboard</span>
            </div>
          </Link>
          {/* Profile*/}
          <div
            onClick={() => {
              const open = isMenuOpen;
              setIsMenuOpen(!open);
              setIsMenuOpen2(false);
            }}
            className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 justify-between py-2 px-4 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img src={user} alt="" />
              <span className="">Profile</span>
            </div>
            {/* <img src={angleUp} alt="" /> */}
          </div>
          {isMenuOpen && (
            <div className="flex flex-col items-center">
              <Link
                to={
                  "/dashboard/student-profile/personal-details/personal-update"
                }
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Personal Profile</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/profile-update"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Personal Update</span>
                  </div>
                </div>
              </Link>

              <Link
                to={"/dashboard/student-profile/education-profile"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Education Profile</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/employment"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Employment</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/skills"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Skills</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/resume"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Resume</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/career-profile"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Career Profile</span>
                  </div>
                </div>
              </Link>
              <Link
                to={"/dashboard/student-profile/change-password"}
                className="w-4/5 h-12"
              >
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">Change Password</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {/* Jobs*/}
          <div
            className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full  text-white gap-2 py-2 px-4"
            onClick={() => {
              const open = isMenuOpen2;
              setIsMenuOpen2(!open);
              setIsMenuOpen(false);
            }}
          >
            <img src={user} alt="" />
            <span className="font-semibold">Jobs</span>
          </div>
          {isMenuOpen2 && (
            <div className="flex flex-col items-center">
              <Link to={"/dashboard/applied-job"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="text-nowrap">Applied Jobs</span>
                  </div>
                </div>
              </Link>
              <Link to={"/dashboard/new-job"} className="w-4/5 h-12">
                <div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
                  <div className="flex items-center gap-2">
                    <img src={user} alt="" />
                    <span className="">New Jobs</span>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {/* Transation*/}
          <Link>
            <div
              className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMenuOpen2(false);
              }}
            >
              <img src={transition} alt="" />
              <span className="">Transaction</span>
            </div>
          </Link>
          {/* Secotr*/}
          <Link to={"/dashboard/student-profile/sectors"}>
            <div
              className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMenuOpen2(false);
              }}
            >
              <img src={stat} alt="" />
              <span className="">Sectors</span>
            </div>
          </Link>
          <div
            onClick={logoutHandler}
            className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4 cursor-pointer"
          >
            <img src={signout} alt="" className="w-7 h-7" />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <img src={leftBanner} alt="" className="p-4" />
      <ToastContainer />
    </div>
  );
}

export default StudentDashboardSidebar;
