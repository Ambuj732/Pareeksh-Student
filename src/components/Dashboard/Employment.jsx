import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import PersonalProfile from "./PersonalProfile";
import ProfileUpdate from "./ProfileUpdate";
import openbook from "../../assets/Dashboard/openbook.png";
import getEmployments from "../../actions/Dashboard/getEmployments";
import formatDate from "../../utils/formatDate";

function Employment() {
  const [employments, setEmployments] = useState([]);

  const getEmploymentHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
      };
      const response = await getEmployments(data);
      if (response?.data?.code === 1000)
        setEmployments(response?.data?.employments);
    } catch (error) {
      console.log("Error while getting employments :: ", error);
    }
  };

  useEffect(() => {
    getEmploymentHandler();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {employments?.map((employment) => (
        <div key={employment?.id} className="shadow-allBorder rounded-xl pb-10">
          <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-16 items-center rounded-t-xl bg-[#EAF2FE] ">
            <span>{employment?.employer_name}</span>
            <div className="1/2 flex gap-6 items-center">
              <div className="bg-[#C9F4BE] text-[#3B602D] px-4 py-1 rounded-md border border-[#8FC38E]">
                <span>
                  {employment?.current_employer === 1 ? "Current" : "Previous"}
                </span>
              </div>
              <div className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1 flex gap-1 text-white h-8">
                <img src={pen} alt="" className="h-5" />
                <span className="text-smf font-normal">Edit</span>
              </div>
            </div>
          </div>
          <div className="flex p-4 px-8 flex-col gap-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Date of Joining</span>
                  <div className="font-medium text-base">
                    {formatDate(employment?.date_of_joining)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Designation</span>
                  <div className="font-medium text-base">
                    {employment.degignation}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Level</span>
                  <div className="font-medium text-base">Mid Level</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Sector</span>
                  <div className="font-medium text-base">
                    Information Technology
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Occupation</span>
                  <div className="font-medium text-base">IT Professional</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Current Salary</span>
                  <div className="font-medium text-base">
                    {employment?.salary}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Notice period</span>
                  <div className="font-medium text-base">
                    {employment.notice_period} Days
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Employment Type</span>
                  <div className="font-medium text-base">
                    {employment.employment_type}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-[#E7F0FF] text-[#1C4481] font-medium p-2 rounded-md w-full">
                <span>Current Location</span>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 text-sm w-1/3">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Town</span>
                  <div className="font-medium text-base">
                    {employment.id_town}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/3">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">District</span>
                  <div className="font-medium text-base">
                    {employment.id_city}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/3">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">State</span>
                  <div className="font-medium text-base">
                    {employment.id_state}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Employment;
