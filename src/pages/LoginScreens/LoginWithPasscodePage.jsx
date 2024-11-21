import React from "react";
import passcodeBg from "../../assets/LoginScreen/passcodeBg.jpg";
import books from "../../assets/LoginScreen/books.png";
import graduationCap from "../../assets/LoginScreen/cap.png";
import scaleAndPencle from "../../assets/LoginScreen/scalepencle.jpg";
import exam from "../../assets/LoginScreen/exam.png";
import parkeeshnLogo from "../../assets/LoginScreen/parkeeshnLogo.png";
import hand from "../../assets/LoginScreen/hand.png";
import laptop from "../../assets/LoginScreen/laptop.png";
import scaleAndPencil from "../../assets/LoginScreen/scaleAndPencil.png";
import student from "../../assets/LoginScreen/student.png";
import bulb from "../../assets/LoginScreen/bulb.png";
import building from "../../assets/LoginScreen/building.png";
import personWithLaptop from "../../assets/LoginScreen/personWithLaptop.png";
import logo from "../../assets/logo/pareekshn_logo.png";

import { Outlet } from "react-router";

function LoginWithPasscodePage() {
  return (
    <div className="p-6 max-h-screen flex justify-center items-center relative">
      <div className="h-[530px] m-8 w-[65%] bg-[#2F5185] rounded-t-3xl rounded-bl-3xl rounded-br-3xl"></div>
      {/* <img src={passcodeBg} alt="" className="h-[550px] m-8 bg-[#e6e6e8]" /> */}
      <img src={exam} alt="" className="absolute h-56 left-80" />
      <img src={logo} alt="" className="absolute top-20 left-80 h-16" />
      <img
        src={graduationCap}
        alt=""
        className="absolute h-16 top-48 left-48"
      />
      <img src={hand} alt="" className="absolute top-16 h-16 left-[500px]" />
      <img src={laptop} alt="" className="absolute top-44 left-[660px] h-16" />
      <img
        src={scaleAndPencil}
        alt=""
        className="absolute h-28 top-[440px] left-[600px]"
      />
      <img
        src={student}
        alt=""
        className="absolute h-20 right-[190px] top-20"
      />
      <img
        src={books}
        alt=""
        className="absolute top-[500px] right-[190px] h-24"
      />
      <img
        src={bulb}
        alt=""
        className="absolute top-[500px] left-[400px] h-24"
      />
      <img
        src={building}
        alt=""
        className="absolute top-[520px] left-[260px] h-20 "
      />
      <img
        src={personWithLaptop}
        alt=""
        className="absolute top-[520px] left-[120px] h-20"
      />
      <Outlet />
      {/* Component */}
      {/* <VerifyProfile /> */}
      {/* <UploadPhoto /> */}
      {/* <EnterLoginPasscode /> */}
      {/* <UploadIDPhoto /> */}
      {/* <OTPVerify /> */}
      {/* <AadharVerify /> */}
      {/* <AadharOTP /> */}
      {/* <LoginWithOTP /> */}
    </div>
  );
}

export default LoginWithPasscodePage;
