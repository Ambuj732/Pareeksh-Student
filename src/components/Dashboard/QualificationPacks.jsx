import React from "react";
import next from "../../assets/Dashboard/next.png";
import nextarrow from "../../assets/Dashboard/nextarrow.png";

function QualificationPacks() {
  return (
    <div className="flex flex-col gap-6 py-6 px-4">
      <div className="flex items-center justify-between bg-white h-20 rounded-md px-8">
        <div className="w-1/4 flex justify-between  font-medium">
          <span>L-02</span>
          <span>Level 2</span>
        </div>
        <div className="flex gap-4 bg-[#0C49CA] items-center p-2 px-4 text-white rounded-full">
          <span>Find an Exam</span>
          <div className="h-8 w-8 bg-white flex items-center rounded-full justify-center">
            <img src={nextarrow} alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white h-20 rounded-md px-8">
        <div className="w-1/4 flex justify-between  font-medium">
          <span>L-03</span>
          <span>Level 3</span>
        </div>
        <div className="flex gap-4 bg-[#0C49CA] items-center p-2 px-4 text-white rounded-full">
          <span>Find an Exam</span>
          <div className="h-8 w-8 bg-white flex items-center rounded-full justify-center">
            <img src={nextarrow} alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white h-20 rounded-md px-8">
        <div className="w-1/4 flex justify-between  font-medium">
          <span>L-04</span>
          <span>Level 4</span>
        </div>
        <div className="flex gap-4 bg-[#0C49CA] items-center p-2 px-4 text-white rounded-full">
          <span>Find an Exam</span>
          <div className="h-8 w-8 bg-white flex items-center rounded-full justify-center">
            <img src={nextarrow} alt="" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white h-20 rounded-md px-8">
        <div className="w-1/4 flex justify-between  font-medium">
          <span>L-05</span>
          <span>Level 5</span>
        </div>
        <div className="flex gap-4 bg-[#0C49CA] items-center p-2 px-4 text-white rounded-full">
          <span>Find an Exam</span>
          <div className="h-8 w-8 bg-white flex items-center rounded-full justify-center">
            <img src={nextarrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualificationPacks;
