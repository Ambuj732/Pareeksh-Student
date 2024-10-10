import React from "react";
import avatar from "/avatar.png";
// import CorporateHackathonSidebar from "../CorporateHackathonSidebar";
import close from "../../assets/Hackathon/close.png";
import twoperson from "../../assets/Hackathon/twoperson.png";
import bannertitle from "../../assets/Hackathon/bannertitle.png";
import arrowDown from "../../assets/Hackathon/arrowDown.png";
import time from "../../assets/Hackathon/time.png";
import bannersize from "../../assets/Hackathon/bannersize.png";
import edit from "../../assets/Hackathon/edit.png";
import profileedit from "../../assets/Hackathon/profileedit.png";
import intersect from "../../assets/Hackathon/intersect.png";
import pen from "../../assets/Hackathon/pen.png";
import user from "../../assets/Hackathon/user.png";
import email from "../../assets/Hackathon/email.png";
import tablet from "../../assets/Hackathon/tablet.png";
import location1 from "../../assets/Hackathon/location1.png";

function DashboardCorporateProfile() {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* <CorporateHackathonSidebar /> */}
      <div className="w-5/6 p-4 overflow-y-scroll no-scrollbar">
        <div className="flex items-center justify-between mb-4 p-4">
          <span className="font-semibold text-[#1C4481] text-2xl">
            Dashboard/ <span className="text-[18px]">Corporate Profile</span>
          </span>
        </div>
        <div className="bg-[#EDF2FF] min-h-screen flex justify-center items-center rounded-3xl">
          <div className="bg-white min-h-screen ps-8 flex flex-col gap-6 py-4 pe-4 w-full m-4 rounded-3xl">
            <div>
              <div className="flex justify-between w-11/12">
                <span className="text-sm">Upload Profile Image</span>
                <div className="border border-[#1C4481] rounded-full w-20 flex items-center justify-center font-medium">
                  <div className="flex items-center gap-2 py-1">
                    <img src={pen} alt="" className="h-[22px]" />
                    <span>Edit</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-32 w-32 flex items-center justify-center rounded-full relative bg-[#D9D9D9]">
                  <img
                    src={intersect}
                    alt=""
                    className="h-[105px] absolute top-6"
                  />
                  <img
                    src={profileedit}
                    alt=""
                    className="absolute bg-[#1C4481] rounded-full h-8 p-1 border-white border-[2px] outline-[1px] outline-white bottom-2 right-0"
                  />
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={user} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] text-sm outline-none"
                        value={"Corporate Name"}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={email} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] outline-none text-sm"
                        value={"Email*"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={tablet} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] outline-none text-sm"
                        value={"Corporate Mobile Number**"}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={location1} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] outline-none text-sm"
                        value={"Corporate Location"}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-4/5 flex justify-between my-4 text-[#1C4481]">
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={user} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] outline-none text-sm"
                        value={"Corporate User ID*"}
                      />
                    </div>
                  </div>
                  <div className="flex w-[360px] h-[55px] border border-black rounded-md p-2 px-6 flex-col justify-center">
                    <div className="flex gap-1 items-center">
                      <img src={email} alt="" className=" w-5" />
                      <input
                        className="text-[#1C4481] outline-none text-sm"
                        value={"Password"}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Upload Logo</span>
                  <div
                    className="flex w-[360px] h-[65px] border rounded-md border-black border-dotted p-2 px-6 flex-col items-center justify-between"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <span className="font-medium">Choose File</span>
                    <input
                      id="fileInput"
                      className="text-[#1C4481] outline-none text-sm"
                      type="file"
                      hidden
                    />
                    <span className="text-[12px] text-[#A4A4A4]">
                      Banner Size - 800x400px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCorporateProfile;
