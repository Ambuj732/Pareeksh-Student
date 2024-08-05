import React, { useState, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { DiVim } from "react-icons/di";
import leftBg from "../../assets/LoginScreen/leftBg.jpg";
import { BsThreeDots } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { VscEye } from "react-icons/vsc";
import { LuSquareAsterisk } from "react-icons/lu";
import { FaCircleExclamation } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { Link, Outlet } from "react-router-dom";
import login from "../../actions/LoginScreens/login";
import { useNavigate } from "react-router-dom";
import SlidingMessage from "../ApiResponse";
import * as Yup from "yup";
import { FaAngleDown } from "react-icons/fa6";
import message from "../../assets/LoginScreen/message.png";
import getHighQualList from "../../actions/LoginScreens/getHighQualList";
import getApiData from "../../actions/LoginScreens/getApiData";
import { id } from "date-fns/locale";
import getCities from "../../actions/LoginScreens/getCities";
import updateDataCommon from "../../actions/Dashboard/updateDataCommon";

const AddCareerProfile = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const [highestQualication, setHighestQualication] = useState([]);
  const [errors, setErrors] = useState({});
  const [industry, setIndustry] = useState([]);
  const [department, setDepartment] = useState([]);
  const [roleCategory, setRoleCategory] = useState([]);
  const [jobRole, setJobRole] = useState([]);
  // job Type, employee type , shift , expected salary, state , city
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [employmentType, setEmploymentType] = useState([
    {
      id: 1,
      name: "Full Time",
    },
    {
      id: 2,
      name: "Part Time",
    },
  ]);
  const [shift, setShift] = useState([
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
  ]);
  const [jobType, setJobType] = useState([
    {
      id: 1,
      job_type: "Permanent",
    },
    {
      id: 2,
      job_type: "Contractual",
    },
  ]);
  const [expectedSalary, setExpectedSalary] = useState([
    {
      id: 3,
      expected_ctc: "3 LPA",
    }
  ]);

  const [selectHighestQual, setSelectHighestQual] = useState("");
  const [selectIndustry, setSelectIndustry] = useState("");
  const [selectDepartment, setSelectDepartment] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [selectJobRole, setSelectJobRole] = useState("1");
  const [selectState, setSelectState] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectEmploymentType, setSelectEmploymentType] = useState("");
  const [selectShift, setSelectShift] = useState("");
  const [selectJobType, setSelectJobType] = useState("");
  const [selectExpectedSalary, setSelectExpectedSalary] = useState("");
  useEffect(() => {
    preData();
  }, []);



  const preData = async () => {
    try {
      const highQual = await getHighQualList();
      setHighestQualication(highQual?.data?.high_qual);
      const industries = await getApiData("masterData/fetchIndustry");
      setIndustry(industries?.data?.industries);
      const departments = await getApiData("masterData/fetchDepartments");
      setDepartment(departments?.data?.departments);
      const roleCategories = await getApiData(
        "masterData/fetchJobRoleCategory"
      );
      setRoleCategory(roleCategories?.data?.role_categories);

      const states = await getApiData("studentSelf/getStates");
      setStateList(states?.data?.states);
    } catch (error) {
      console.log(
        "Error while getting highest qualification or states :: ",
        error
      );
    }
  };


  const getCitiesHandler = async (id) => {
		try {
			//console.log("Id :: ", id);
			const data = {
				id_state: id,
			};
			const response = await getCities(data);
			setCityList(response?.data?.cities);
			//console.log("Cities :: ", response?.data?.cities);
		} catch (error) {
			//onsole.log("Error while getting cities :: ", error);
		}
	};

  const handleStateChange = (e) => {
    console.log("State :: ", e.target.value);
		setSelectState(e.target.value);
		getCitiesHandler(e.target.value);
		//console.log("State :: ", e.target.value);
	};

  const handleRoleCategory = (id)=>{
    setSelectJobRole(id);
    getJobRoles(id);
  }

  const getJobRoles = async (id) => {
    try {
      const jobRoles = await getApiData(
        `masterData/fetchJobRole?id_role_category=${id}`
      );
      setJobRole(jobRoles?.data?.job_roles);
    } catch (error) {
      console.log("Error while getting user data :: ", error);
    }
  };

  const UpdateCareerProfile = async (formData) => {
    try {
      console.log(formData);
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
 
      // id_self_student={{id_self_student}}&usercode={{usercode}}&id_role_category=1&id_job_role=1&desired_job_type=1&id_industry=3&expected_salary=9.0&shift=1&id_department=2&id_employment_type=3&id_city=24092&id_state=3687
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        id_role_category: formData?.role_category,
        id_job_role: formData?.job_role,
        desired_job_type: formData?.job_type,
        id_industry: formData?.industry,
        expected_salary: formData?.expected_ctc,
        shift: formData?.shift,
        id_department: formData?.department,
        id_employment_type: formData?.employment_type,
        id_city: formData?.city,
        id_state: formData?.state
      };

      const response = await updateDataCommon('studentProfile/updateDesiredJobDetails', data)
      if (response.data.code === 1000) {
        console.log(response);
        onClose();
      } else {
        console.log("Error while updating profile :: ",response.data.message);
      }
    } catch (error) {
      console.log("Error while editing profile :: ", error);
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center   fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="w-1/2 h-2/3 rounded-md shadow-md ">
        <div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
          <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
            Add Career Profile
          </h1>
          <img
            className="mr-8 items-center mt-2 h-8  cursor-pointer"
            src={close}
            onClick={onClose}
          />
        </div>
        <div className="overflow-y-scroll h-[90%] bg-white ">
          <form onSubmit={handleSubmit(UpdateCareerProfile)}>
            {/* <div className="flex gap-5 justify-around px-5 mt-2">
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("username", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Industry
                    </label>
                  </div>
                </div>
              </div>
              <div className="relative h-12 w-1/2">
                <div>
                  <input
                    type="text"
                    id="floating_filled"
                    className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                    placeholder=""
                    {...register("username", {
                      required: true,
                    })}
                  />
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                    <label htmlFor="" className="pl-2">
                      Department
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="flex gap-5 justify-around px-5 mt-7">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => selectIndustry(e.target.value)}
                    {...register("industry", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Industry
                    </option>
                    {industry?.map((industryName) => (
                      <option key={industryName?.id} value={industryName.id}>
                        {industryName.industry_name}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Department
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => selectDepartment(e.target.value)}
                    {...register("department", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {department?.map((departmentName) => (
                      <option
                        key={departmentName?.id}
                        value={departmentName.id}
                      >
                        {departmentName.department_name}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Department
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="flex gap-5 justify-around px-5 mt-7">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                  
                    {...register("role_category", { required: true })}
                    onChange={(e) => handleRoleCategory(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {roleCategory?.map((roleName) => (
                      <option key={roleName?.id} value={roleName.id}>
                        {roleName.role_category}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Role Category
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => selectJobRole(e.target.value)}
                    {...register("job_role", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {jobRole?.map((jobRoleName) => (
                      <option key={jobRoleName?.id} value={jobRoleName.id}>
                        {jobRoleName.job_role}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Job Role
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="flex gap-5 justify-around px-5 mt-7">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => selectJobType(e.target.value)}
                    {...register("job_type", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Permanent
                    </option>
                    {jobType?.map((jobTypeName) => (
                      <option key={jobTypeName?.id} value={jobTypeName.id}>
                        {jobTypeName.job_type}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Job Type
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => setSelectEmploymentType(e.target.value)}
                    {...register("employment_type", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Full Time
                    </option>
                    {employmentType?.map((employmentTypeName) => (
                      <option
                        key={employmentTypeName?.id}
                        value={employmentTypeName.id}
                      >
                        {employmentTypeName.name}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Employment Type
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="flex gap-5 justify-around px-5 mt-7">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => setSelectShift(e.target.value)}
                    {...register("shift", { required: true })}
                  >
                    <option value="" disabled hidden>
                     Select
                    </option>
                    {shift?.map((shiftName) => (
                      <option key={shiftName?.id} value={shiftName.id}>
                        {shiftName.shift}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Shift
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => setSelectExpectedSalary(e.target.value)}
                    {...register("expected_ctc", { required: true })}
                  >
                    <option value="1" disabled hidden>
                      1 lakhs
                    </option>
                   {expectedSalary?.map((expectedSalaryName) => (

                      <option
                        key={expectedSalaryName?.id}
                        value={expectedSalaryName.id}
                      >
                        {expectedSalaryName.expected_ctc}
                      </option>
                   ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Expected Salary
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
            </div>{" "}
            <div className="flex gap-5 justify-around px-5 mt-7">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                   
                    {...register("state", { required: true })}
                    onChange={(e) => handleStateChange(e)}
                  >
                    <option value="" disabled hidden>
                     State
                    </option>
                    {stateList?.map((state) => (
                      <option 
                      key={state?.id_state}
                      value={state.id_state}>
                        {state.state}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Prefered State
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => setSelectCity(e.target.value)}
                    {...register("city", { required: true })}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    {cityList?.map((cityName) => (
                      <option key={cityName?.id} value={cityName.id_city}>
                        {cityName.city}
                      </option>
                    ))}

                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                    {/* <FaAngleDown /> */}
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Prefered City
                    </label>
                  </div>
                </div>
                {errors.id_hq && (
                  <div className="error text-red-600 font-medium text-sm">
                    {errors?.id_hq}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 mb-4">
              <button className="rounded-full bg-blue-900 px-8 py-1">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCareerProfile;
