import React, { useEffect, useState } from "react";
import profilecircle from "../../assets/Dashboard/profilecircle.png";
import profile from "../../assets/Dashboard/profile.png";
import PersonalUpdate from "../Dashboard/PersonalUpdate";
// import PersonalDetails from "../AdminPanel/PersonalDetails";
import CareerProfile from "../Dashboard/CareerProfile";
// import CareerDetails from "../AdminPanel/CareerDetails";
// import CertificateProject from "../AdminPanel/CertificateProject";
// import OnlineProfile from "../AdminPanel/OnlineProfile";
import { Outlet } from "react-router";
import profilePercentage from "../../actions/Dashboard/profilePercentage";
import getStudentProfile from "../../actions/Dashboard/getStudentProfile";
import { useDispatch } from "react-redux";
import { pushStudentProfile } from "../../store/studentProfileSlice";
import { login as authLogin } from "../../store/authSlice";

function PersonalProfile() {
  const dispatch = useDispatch();
  const [profilePercent, setProfilePercent] = useState([]);
  const [studentProfile, setStudentProfile] = useState({});

  const getProfilePercentageHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      if (user) dispatch(authLogin(user));
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await profilePercentage(data);
      setProfilePercent(response?.data?.profile_perc);
      console.log("Profile percentage :: ");
    } catch (error) {
      console.log("Error while getting profile percentage :: ", error);
    }
  };

  const getStudentProfileHandle = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await getStudentProfile(data);
      if (response?.data?.code == 1000) {
        dispatch(pushStudentProfile(response?.data?.profile));
        setStudentProfile(response?.data?.profile);
      }
      console.log("Profile data :: ", response?.data?.profile);
    } catch (error) {
      console.log("Error while getting profile pic :: ", error);
    }
  };

  useEffect(() => {
    getProfilePercentageHandler();
    getStudentProfileHandle();
  }, []);

  return (
    <div className="flex gap-6">
      <div className="w-[300px] bg-[#D7E7FF] h-fit rounded-3xl flex items-center flex-col pb-14">
        <div className="h-60 flex items-center justify-center relative">
          <img src={profilecircle} alt="" className="h-52 z-10" />
          <img
            src={studentProfile?.profile_pic}
            alt=""
            className="absolute h-[178px] rounded-full p-4 mx-4"
          />
        </div>
        <span className="text-sm text-[#1C4481] mb-6 px-6 text-center">
          Please complete your profile. It will help you to get relevant exams
          and job recommendation.fsdfs
        </span>

        <div className="flex flex-col items-center min-h-60">
          <span className="font-medium">Profile Completion</span>
          <span className="text-3xl font-semibold text-[#1C4481]">
            {profilePercent?.length > 0 && profilePercent[0]?.score_percentage}%
          </span>
        </div>
        {/* <div className="flex flex-col w-full p-4 text-sm h-72 gap-2">
					<div className="flex justify-between items-center">
						<span className="font-semibold w-1/3">Name</span>
						<span className="font-medium w-2/3">: Shiv Gupta</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-semibold w-1/3">Email</span>
						<span className="font-medium w-2/3">
							: shivdayalgpt@gmail.com
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-semibold w-1/3">Mobile</span>
						<span className="font-medium w-2/3">: 8904558208</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="font-semibold w-1/3">Username</span>
						<span className="font-medium w-2/3">: shiv01</span>
					</div>

					<div className="flex justify-between items-center">
						<span className="font-semibold w-1/3">
							Highest Qualification
						</span>
						<span className="font-medium w-2/3">: 12th</span>
					</div>
				</div> */}
      </div>
      <Outlet />
      {/* <PersonalUpdate /> */}
      {/* <PersonalDetails /> */}
      {/* <CareerDetails /> */}
      {/* <CertificateProject /> */}
      {/* <OnlineProfile /> */}
    </div>
  );
}

export default PersonalProfile;
