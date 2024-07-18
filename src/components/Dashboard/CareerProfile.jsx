import React from "react";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";
import abled from "../../assets/Dashboard/abled.png";
import language from "../../assets/Dashboard/language.png";

function CareerProfile() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Industry</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={category} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Department</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Role Category</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={category} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Job Role</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Job Type</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={category} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Employment Type</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Shift</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={category} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Expected Salary</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={marital} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Preferred State</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
        <div className="flex flex-col gap-2 w-1/3">
          <div className="flex items-center gap-2">
            <img src={category} alt="" className="h-4" />
            <span className="text-sm text-[#1C4481]">Preferred City</span>
          </div>
          <input
            disabled
            type="text"
            className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
          />
        </div>
      </div>
    </div>
  );
}

export default CareerProfile;
