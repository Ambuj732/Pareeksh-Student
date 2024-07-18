import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import practice from "../../assets/Dashboard/practice.png";
import icon from "../../assets/Dashboard/icon.png";
import attempted from "../../assets/Dashboard/attempted.png";
import dashboardExamList from "../../actions/MasterDataApi/dashboardExamList";
import attemptedList from "../../actions/MasterDataApi/attemptedList";

const AttemptedExam = () => {
  const [dataList, setDataList] = useState(null);
  const [error, setError] = useState([]);
  const getAttemptedList = async () => {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    console.log("Attempted List Response:", user);
    try {
      const data = {
        usercode: user?.usercode,
        id_self_student: user.id_self_student,
      };
      const response = await attemptedList(data);
      if (response?.data?.code === 1000)
        setDataList(response?.data?.pastExamList);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      setError([error.message]);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MM/dd/yyyy, hh:mm a");
  };

  useEffect(() => {
    getAttemptedList();
  }, []);
  return (
    <div className="flex max-h-screen items-center  justify-around gap-3 font-custom">
      <div className="flex flex-col w-1/2 bg-white shadow-md rounded-3xl min-h-96  ">
        <div className="flex flex-col mx-4">
          <span className="text-2xl text-[#000000]">Result Statistics</span>
          <span>loren ispum is simply dummy test of the</span>
        </div>
        <hr className=" border-2 bg-[#CFCFCF]"></hr>
      </div>
      <div className=" w-3/5 h-[600px] bg-white shadow-md border flex flex-col items-center justify-center rounded-3xl  overflow-y-scroll overflow-hidden no-scrollbar">
        {dataList &&
          dataList.map((list) => (
            <div className="flex flex-col w-5/6  mb-7 mt-7 bg-white shadow-md rounded-3xl  ">
              <div className="w-full  bg-white rounded-3xl">
                <div className="flex  items-center justify-around p-6  mx-4 mt-7">
                  <div className="flex flex-col">
                    <span>
                      <span className="text-[#1C4481] font-semibold">
                        Exam-{list.exam_name}
                      </span>
                    </span>
                    <span className="text-sm text-[#1C4481] font-medium">
                      Sector- {list.sector}
                    </span>
                  </div>
                  <div className="flex items-center  gap-4 ">
                    <div className="flex items-center bg-[#1C4481] h-10 w-36 rounded-full justify-center">
                      <div className="flex items-center">
                        <span className="text-white cursor-pointer ">
                          Show Result
                        </span>
                        <img src={start} alt="" />
                      </div>
                    </div>
                    <div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-white cursor-pointer ">
                          Re-take
                        </span>
                        <img src={start} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <hr class="border-t-[1px] border-[#1C4481]" />
                <div className="flex justify-between mt-7 mx-4  mb-4 flex-col text-[#1C4481] overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center ">
                      <img src={pack} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Qualification Pack</span>
                        <span className="font-semibold">Level 3</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <img src={code} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Qualification Code</span>
                        <span className="font-semibold">L-03</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={duration} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Exam Duration</span>
                        <span className="font-semibold">
                          {list.duration} Mins
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={passcode} alt="" className="h-8" />
                      <div className="flex flex-col text-[12px]">
                        <span>Exam Attempted</span>

                        <span className="font-semibold">
                          {formatDate(list.logout_time)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AttemptedExam;
