import React from "react";
import avatar from "/avatar.png";
import profileComletion from "/profileCompletion.png";
import CorporateHackathonDashboard from "../../pages/Hackathon/CorporateHackathonDashboard";
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
import paidcorner from "../../assets/Hackathon/paidcorner.png";
import checkring from "../../assets/Hackathon/checkring.png";
import download from "../../assets/Hackathon/download.png";
import cost from "../../assets/Hackathon/cost.png";
import total from "../../assets/Hackathon/total.png";
import totalcandidate from "../../assets/Hackathon/totalcandidate.png";
import costtorecruit from "../../assets/Hackathon/costtorecruit.png";

function CompletedHackathon() {
  return (
    <div className="min-h-screen flex">
      <CorporateHackathonSidebar />
      <div className="w-5/6 p-4">
        <div className="flex items-center justify-between mb-4 p-4">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/
            <span className="text-[18px] text-black">Completed Hackathon</span>
          </span>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen flex flex-col py-4 gap-8 rounded-3xl">
          <div
            className={`w-[calc(100%-40px)] shadow-completedHackathon h-fit mx-auto px-2 pb-2 bg-white rounded-3xl`}
          >
            <div className="flex h-1/2 items-center justify-between p-6">
              <div className="flex w-2/3 gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1C4481] text-lg">
                    Hackathon Title Name
                  </span>
                  <span className="text-sm text-[#1C4481] font-medium">
                    UI/UX Designer
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#4F9B52] h-10 w-fit px-3 bg-[#4F9B52] gap-2 rounded-full">
                  <img src={checkring} alt="" className="h-7" />
                  <div className="flex items-center gap-2 w-1/4">
                    <span className="text-white text-sm">Done</span>
                  </div>
                </div>
                <img src={download} alt="" className="h-10" />
                <span className="text-[#1C4481] font-medium">View Result</span>
              </div>
            </div>
            <hr class="border-t-[1px] border-[#1C4481]" />
            <div className="flex px-6 py-2 w-full text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={total} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    75
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={totalcandidate} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate Selected
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    50
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={costtorecruit} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Recruitment cost <br />
                    per candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={cost} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Total Cost</span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25,000
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-6 py-2  text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={date} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Date & Time
                  </span>
                  <span className="font-semibold">12-07-2023 | 12:30 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={sector} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Sector</span>
                  <span className="font-semibold">IT Sector</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={location} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Location</span>
                  <span className="font-semibold">Noida, Uttar Pradesh</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={level} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Level</span>
                  <span className="font-semibold">Easy</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-[calc(100%-40px)] shadow-completedHackathon h-fit mx-auto px-2 pb-2 bg-white rounded-3xl`}
          >
            <div className="flex h-1/2 items-center justify-between p-6">
              <div className="flex w-2/3 gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1C4481] text-lg">
                    Hackathon Title Name
                  </span>
                  <span className="text-sm text-[#1C4481] font-medium">
                    UI/UX Designer
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#4F9B52] h-10 w-fit px-3 bg-[#4F9B52] gap-2 rounded-full">
                  <img src={checkring} alt="" className="h-7" />
                  <div className="flex items-center gap-2 w-1/4">
                    <span className="text-white text-sm">Done</span>
                  </div>
                </div>
                <img src={download} alt="" className="h-10" />
                <span className="text-[#1C4481] font-medium">View Result</span>
              </div>
            </div>
            <hr class="border-t-[1px] border-[#1C4481]" />
            <div className="flex px-6 py-2 w-full text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={total} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    75
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={totalcandidate} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate Selected
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    50
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={costtorecruit} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Recruitment cost <br />
                    per candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={cost} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Total Cost</span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25,000
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-6 py-2  text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={date} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Date & Time
                  </span>
                  <span className="font-semibold">12-07-2023 | 12:30 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={sector} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Sector</span>
                  <span className="font-semibold">IT Sector</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={location} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Location</span>
                  <span className="font-semibold">Noida, Uttar Pradesh</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={level} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Level</span>
                  <span className="font-semibold">Easy</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`w-[calc(100%-40px)] shadow-completedHackathon h-fit mx-auto px-2 pb-2 bg-white rounded-3xl`}
          >
            <div className="flex h-1/2 items-center justify-between p-6">
              <div className="flex w-2/3 gap-2">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1C4481] text-lg">
                    Hackathon Title Name
                  </span>
                  <span className="text-sm text-[#1C4481] font-medium">
                    UI/UX Designer
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#4F9B52] h-10 w-fit px-3 bg-[#4F9B52] gap-2 rounded-full">
                  <img src={checkring} alt="" className="h-7" />
                  <div className="flex items-center gap-2 w-1/4">
                    <span className="text-white text-sm">Done</span>
                  </div>
                </div>
                <img src={download} alt="" className="h-10" />
                <span className="text-[#1C4481] font-medium">View Result</span>
              </div>
            </div>
            <hr class="border-t-[1px] border-[#1C4481]" />
            <div className="flex px-6 py-2 w-full text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={total} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    75
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={totalcandidate} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Total Candidate Selected
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    50
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={costtorecruit} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Recruitment cost <br />
                    per candidate
                  </span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={cost} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Total Cost</span>
                  <span className="font-semibold text-lg text-[#4A4A4A]">
                    25,000
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-6 py-2  text-[#1C4481]">
              <div className="flex items-center gap-2 w-1/4">
                <img src={date} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">
                    Date & Time
                  </span>
                  <span className="font-semibold">12-07-2023 | 12:30 PM</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={sector} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Sector</span>
                  <span className="font-semibold">IT Sector</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={location} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Location</span>
                  <span className="font-semibold">Noida, Uttar Pradesh</span>
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/4">
                <img src={level} alt="" className="h-8" />
                <div className="flex flex-col text-[14px]">
                  <span className="text-[#1C4481] font-medium">Level</span>
                  <span className="font-semibold">Easy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedHackathon;
