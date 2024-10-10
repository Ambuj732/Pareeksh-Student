import React, { useEffect, useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import PersonalProfile from "./PersonalProfile";
import ProfileUpdate from "./ProfileUpdate";
import openbook from "../../assets/Dashboard/openbook.png";
import getEducations from "../../actions/Dashboard/getEducations";

function EducationProfile() {
  const [educations, setEducations] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);

  const getEducationHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
      };
      const response = await getEducations(data);
      if (response?.data?.code === 1000)
        setEducations(response.data.qualifications);
      console.log(response.data.qualifications);
    } catch (error) {
      console.log("Error while getting education :: ", error);
    }
  };

  useEffect(() => {
    getEducationHandler();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {educations?.map((education) => (
        <div
          key={education?.course_name}
          className="h-60 shadow-allBorder rounded-xl"
        >
          <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-16 items-center rounded-t-xl bg-[#EAF2FE] ">
            <span>{education?.highest_qualification}</span>
            <div className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1 flex gap-1 text-white h-8">
              <img src={pen} alt="" className="h-5" />
              <span className="text-smf font-normal">Edit</span>
            </div>
          </div>
          <div className="flex p-4 flex-col gap-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Course</span>
                  <div className="font-medium text-base">
                    {education?.course_name}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Specialization</span>
                  <div className="font-medium text-base">
                    {education.id_specilization}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Name of School</span>
                  <div className="font-medium text-base">
                    {education.institute_name}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Name of Board</span>
                  <div className="font-medium text-base">
                    {education.board_name}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Percentage Scored</span>
                  <div className="font-medium text-base">
                    {education.percentage}%
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Year of Passing</span>
                  <div className="font-medium text-base">
                    {education.year_of_passing}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Town</span>
                  <div className="font-medium text-base">Noida</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">District</span>
                  <div className="font-medium text-base">
                    Gautam Budha Nagar
                  </div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">State</span>
                  <div className="font-medium text-base">Uttar Pradesh</div>
                </div>
              </div>
              <div className="flex gap-2 text-sm w-1/5">
                <img src={openbook} alt="" className="h-5" />
                <div className="flex flex-col">
                  <span className="text-[#1C4481]">Pin Code</span>
                  <div className="font-medium text-base">201301</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="h-36 shadow-allBorder rounded-xl">
        <div className="flex justify-between text-[#1C4481] font-medium px-8 text-lg h-16 items-center rounded-t-xl bg-[#EAF2FE] ">
          <span>Professional Program</span>
          <div className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1 flex gap-1 text-white h-8">
            <img src={pen} alt="" className="h-5" />
            <span className="text-smf font-normal">Edit</span>
          </div>
        </div>
        <div className="flex p-4 flex-col gap-4">
          <div className="flex justify-between w-full">
            <div className="flex gap-2 text-sm w-1/3">
              <img src={openbook} alt="" className="h-5" />
              <div className="flex flex-col">
                <span className="text-[#1C4481]">
                  Name of Institute/University
                </span>
                <div className="font-medium text-base">
                  Bal Bharti Public School
                </div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/3">
              <img src={openbook} alt="" className="h-5" />
              <div className="flex flex-col">
                <span className="text-[#1C4481]">Percentage Scored</span>
                <div className="font-medium text-base">55%</div>
              </div>
            </div>
            <div className="flex gap-2 text-sm w-1/3">
              <img src={openbook} alt="" className="h-5" />
              <div className="flex flex-col">
                <span className="text-[#1C4481]">Year of Passing</span>
                <div className="font-medium text-base">2018</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EducationProfile;
