import  { useEffect, useState } from "react";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";

import getApiData from "../../actions/LoginScreens/getApiData";
import getCommonApiData from "../../actions/LoginScreens/getCommonApiData";
import { useSelector } from "react-redux";


function CareerProfile() {
  const recallCount = useSelector((state)=>state.call.recallCount)
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [selectJobCategory, setSleectJobCategory] = useState("");
  const [selectJobRole, setSelectJobRole] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectEmpType, setSelectEmpType] = useState("");
  const [selectShift, setSelectShift] = useState("");
  const [selectJobType, setSelectJobType] = useState("");
  const [selectExpectedSalary, setSelectExpectedSalary] = useState("");

  useEffect(() => {
    getProfileSummary();
  }, [recallCount]);

  const getProfileSummary = async () => {
    try {
      const response = await getCommonApiData(
        "studentProfile/getDesiredJobDetails"
      );
      const industries = await getApiData("masterData/fetchIndustry");
      const departments = await getApiData("masterData/fetchDepartments");
      const jobRoleCategory = await getApiData(
        "masterData/fetchJobRoleCategory"
      );
      const jobRoles = await getApiData(
        `masterData/fetchJobRole?id_role_category=${response.data?.desired_job?.id_role_category}`
      );
      const empTypes = await getApiData("masterData/fetchEmpTypes");
      const states = await getApiData("studentSelf/getStates");
      const cities = await getApiData(
        `studentSelf/getCities?id_state=${response.data?.desired_job?.id_state}`
      )
      console.log(states.data.states);
      console.log(cities.data.cities);
      const jobTypes = [
        {
          id: 1,
          job_type: "Permanent",
        },
        {
          id: 2,
          job_type: "Contractual",
        },
      ];
      const shifts = [
        {
          id: 1,
          shift: "Day",
        },
        {
          id: 2,
          shift: "Night",
        },
        {
          id: 3,
          shift: "Flexible",
        },
      ];
      setSelectIndustry(
        industries?.data?.industries?.find(
          (item) => item.id === response.data?.desired_job.id_industry
        ).industry_name
      );
      setSelectDepartment(
        departments?.data?.departments?.find(
          (item) => item.id === response.data?.desired_job.id_department
        ).department_name
      );
      setSleectJobCategory(
        jobRoleCategory?.data?.role_categories?.find(
          (item) => item.id === response.data?.desired_job.id_role_category
        ).role_category
      );
      setSelectJobRole(
        jobRoles?.data?.job_roles?.find(
          (item) => item.id === response.data?.desired_job.id_job_role
        ).job_role
      );
      setSelectEmpType(
        empTypes?.data?.emp_types?.find(
          (item) => item.id === response.data?.desired_job.id_employment_type
        ).employment_type
      );
      setSelectJobType(
        jobTypes.find(
          (item) => item.id === response.data?.desired_job.desired_job_type
        ).job_type
      );
      setSelectShift(
        shifts.find((item) => item.id === response.data?.desired_job.shift)
          .shift
      );
      setSelectExpectedSalary(response.data?.desired_job?.expected_salary);
      setSelectState(
        states?.data?.states?.find(
          (item) => item.id_state === response.data?.desired_job.id_state
        ).state
      )
      setSelectCity(
        cities?.data?.cities?.find(
          (item) => item.id_city === response.data?.desired_job.id_city
        ).city
      )
    } catch (error) {
      console.log("Error while getting profile summary :: ", error);
    }
  };
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
            value={selectIndustry}
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
            value={selectDepartment}
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
            value={selectJobCategory}
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
            value={selectJobRole}
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
            value={selectJobType}
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
            value={selectEmpType}
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
            value={selectShift}
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
            value={selectExpectedSalary}
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
            value={selectState}
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
            value={selectCity}
          />
        </div>
      </div>
    </div>
  );
}

export default CareerProfile;
