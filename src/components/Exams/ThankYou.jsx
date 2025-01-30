import React from "react";
import thankyou from "../../assets/Exam/thankyou.png";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="h-screen w-screen overflow-x-hidden fixed top-0 left-0 flex justify-center items-center font-custom bg-[#1C4481] bg-opacity-35 transition-all">
      <div className="h-2/3 w-1/2 bg-white rounded-[25px] flex flex-col items-center justify-center gap-6 font-medium border border-zinc-300">
        <img src={thankyou} alt="" className="h-24" />
        <span className="text-3xl">Thank You</span>
        <span className="text-sm">
          Hope you had good experience giving exam in this application.
        </span>
        <span className="text-xl text-[#1C4481] ">
          Best of luck for your future
        </span>
        <Link to={"/"}>
          <div className="h-12 border flex items-center justify-center w-60 bg-[#1C4481] rounded-full text-white">
            <span>Go To Login</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
