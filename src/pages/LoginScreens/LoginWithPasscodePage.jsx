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
    <div className="max-h-screen flex justify-center items-center relative">
      <div className="h-screen w-full bg-[#2F5185]"></div>
      <img src={exam} alt="" className="absolute h-56 left-96" />
      <img src={logo} alt="" className="absolute top-10 left-10 h-20" />
      <img
        src={graduationCap}
        alt=""
        className="absolute h-16 top-14 right-20"
      />
      {/* <img src={laptop} alt="" className="absolute bottom-32 left-10 h-16" /> */}
      {/* <img
        src={scaleAndPencil}
        alt=""
        className="absolute h-28 bottom-32 left-[600px]"
      /> */}
      {/* <img src={student} alt="" className="absolute h-20 right-16 top-60" /> */}
      <img
        src={books}
        alt=""
        className="absolute top-[500px] right-[150px] h-24"
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
