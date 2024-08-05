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
import addEmployment from "../../actions/Dashboard/addEmployment";
import getStates from "../../actions/LoginScreens/getStates";
import getEmpTypes from "../../actions/MasterDataApi/getEmpTypes";
import getCities from "../../actions/LoginScreens/getCities";
import getIndustry from "../../actions/MasterDataApi/getIndustry";
import fetchDepartments from "../../actions/MasterDataApi/getDepartments";
import getDepartments from "../../actions/MasterDataApi/getDepartments";
import getTown from "../../actions/MasterDataApi/getTown";

const AddEmployment = ({ onClose, type , data }) => {
	const { register, handleSubmit } = useForm();
	const [highestQualication, setHighestQualication] = useState([]);
	const [states, setStates] = useState([]);
	const [selectedState, setSelectedState] = useState("");
	const [cities, setCities] = useState([]);
	const [errors, setErrors] = useState({});
	const [employmentType, setEmploymentType] = useState("experienced");
	const [employmentTypes, setEmploymentTypes] = useState([]);
	const [industries, setIndustries] = useState([]);
	const [departments, setDepartments] = useState([]);
	const [selectedCity, setSelectedCity] = useState("");
	const [town, setTown] = useState([]);
	const users = JSON.parse(localStorage.getItem("ps_loguser"));

	const preData = async () => {
		try {
			const statesList = await getStates();
			console.log(statesList?.data?.states);
			setStates(statesList?.data?.states);
			const employmentTypeList = await getEmpTypes();
			console.log(employmentTypeList?.data?.emp_types);
			setEmploymentTypes(employmentTypeList?.data?.emp_types);
			const industryList = await getIndustry();
			console.log(industryList?.data?.industries);
			setIndustries(industryList?.data?.industries);
			const departmentsList = await getDepartments();
			console.log(departmentsList?.data?.departments);
			setDepartments(departmentsList?.data?.departments);
		} catch (error) {
			console.log(
				"Error while getting highest qualification or states :: ",
				error
			);
		}
	};

	useEffect(() => {
		preData();
	}, []);

	const handleChange = (event) => {
		setEmploymentType(event.target.value);
		console.log("Selected employment type:", event.target.value);
	};

	const addEmploymentHandler = async (formData) => {
		try {
			console.log(formData);
			const data = {
				id_self_student: users?.id_self_student,
				usercode : users?.usercode,
				id_employment_type: 2,
				employer_name: formData?.employerName,
				id_town: 6,
				id_city: 23406,
				id_pincode: 6,
				id_industry: 2,
				current_employer: 1,
				id_department: 2,
				date_of_joining: formData?.dateOfJoining,
				degignation: formData?.degignation,
				id_state: 3654,
				id_student_employment: 13,
				notice_period: formData?.noticePeriod,
				salary: formData?.salary,
				
			};
			// console.log(data);
			const response = await addEmployment(data);
			console.log(response);
		} catch (error) {
			console.log("Error while adding employment :: ", error);
		}
	};

	useEffect(() => {
		const loadCities = async () => {
			try {
				console.log(selectedState);
				const data = {
					id_state: Number(selectedState),
				};
				console.log(data);
				const citiesList = await getCities(data);
				console.log(citiesList);
				setCities(citiesList?.data?.cities);
			} catch (error) {
				console.log("Error while getting cities :: ", error);
			}
		};
		loadCities();
	}, [selectedState]);

	useEffect(() => {
		const loadTown = async () => {
			try {
				console.log(selectedCity);
				const data = {
					id_city: Number(selectedCity),
				};
				console.log(data);
				const townList = await getTown(data);
				console.log(townList);
				setTown(townList?.data?.towns);
			} catch (error) {
				console.log("Error while getting cities :: ", error);
			}
		};
		loadTown();
	}, [selectedCity]);

	return (
		<div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
			<div className="w-1/2 h-2/3 rounded-md shadow-md ">
				<div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
					<h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
					{type==="edit" ? "Edit" : "Add"} Employment
					</h1>
					<img
						className="mr-8 items-center mt-2 h-8  cursor-pointer"
						src={close}
						onClick={onClose}
					/>
				</div>
				<div className="overflow-y-scroll h-[90%] bg-white ">
					<form onSubmit={handleSubmit(addEmploymentHandler)}>
						<div className="flex items-center justify-center mt-4 gap-4">
							<input
								id="default-radio-1"
								type="radio"
								value="fresher"
								name="employmentType"
								checked={employmentType === "fresher"}
								onChange={handleChange}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-white-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
							>
								Fresher
							</label>
							<div className="flex items-center">
								<input
									id="default-radio-2"
									type="radio"
									value="experienced"
									name="employmentType"
									checked={employmentType === "experienced"}
									onChange={handleChange}
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
								/>
								<label
									htmlFor="default-radio-2"
									className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
								>
									Experienced
								</label>
							</div>
						</div>
						{employmentType == "experienced" && (
							<>
								<div>
									<h1 className="px-5 mt-7 font-semibold">
										Desired Work Location
									</h1>
								</div>
								<hr className="border-black mt-1 mx-4"></hr>
								<div className="h-10 flex items-center gap-4 px-5">
									<div className="flex items-center">
										<input
											id="default-radio-3"
											type="radio"
											value="current"
											name="location"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-white-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											for="default-radio-3"

											class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Current
										</label>
									</div>
									<div class="flex items-center">
										<input
											checked
											id="default-radio-4"
											type="radio"
											value="previous"
											name="location"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											for="default-radio-4"
											class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
										>
											Previous
										</label>
									</div>
								</div>
								<div className="flex gap-5 justify-around px-5 mt-4">
									<div className="relative h-12 w-1/2">
										<div>
											<input
												type="text"
												id="floating_filled"
												className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
												placeholder=""
												{...register("employerName", {
													required: true,
												})}
											/>
											<div
												htmlFor="floating_filled"
												className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
												<label
													htmlFor=""
													className="pl-2"
												>
													Employer Name
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
												{...register("designation", {
													required: true,
												})}
											/>
											<div
												htmlFor="floating_filled"
												className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
												<label
													htmlFor=""
													className="pl-2"
												>
													Designation
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="flex gap-5 px-5 mt-5">
									<div className="relative h-14 mb-3 w-[48%]">
										<div>
											<input
												type="date"
												id="floating_filled"
												className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
												placeholder=""
												{...register("startDate", {
													required: true,
												})}
											/>
											<div
												htmlFor="floating_filled"
												className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
												<label
													htmlFor=""
													className="pl-2"
												>
													Start Date
												</label>
											</div>
										</div>
										{errors.id_hq && (
											<div className="error text-red-600 font-medium text-sm">
												{errors?.id_hq}
											</div>
										)}
									</div>
									<div className="relative h-14 mb-3 w-[48%]">
										<div>
											<input
												type="date"
												id="floating_filled"
												className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
												placeholder=""
												{...register("endDate", {
													required: true,
												})}
											/>
											<div
												htmlFor="floating_filled"
												className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
												<label
													htmlFor=""
													className="pl-2"
												>
													End Date
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
								<div className="flex gap-5 justify-around px-5 mt-5">
									<div className="relative h-14 mb-3 w-1/2">
										<div>
											<select
												id="qualification_select"
												className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
												defaultValue=""
												{...register("department", {
													required: true,
												})}
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{departments?.map(
													(qualName) => (
														<option
															key={qualName?.id}
															value={qualName.id}
														>
															{
																qualName?.department_name
															}
														</option>
													)
												)}
											</select>
											<div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
												{/* <FaAngleDown /> */}
											</div>
											<div
												htmlFor="floating_filled"
												className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
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
												onChange={(e) =>
													handleSelectQualification(
														e.target.value
													)
												}
												{...register("industry", {
													required: true,
												})}
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{industries?.map((qualName) => (
													<option
														key={qualName?.id}
														value={qualName.id}
													>
														{qualName.industry_name}
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
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
													Industry
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
								<div className="flex px-5 mt-5">
									<div className="relative h-14 mb-3 w-1/2">
										<div>
											<select
												id="qualification_select"
												className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
												defaultValue=""
												{...register("empType", {
													required: true,
												})}
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{employmentTypes?.map(
													(qualName) => (
														<option
															key={qualName?.id}
															value={qualName.id}
														>
															{
																qualName.employment_type
															}
														</option>
													)
												)}
											</select>
											<div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
												{/* <FaAngleDown /> */}
											</div>
											<div
												htmlFor="floating_filled"
												className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
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
								</div>
								<div>
									<h1 className="px-5 mt-7 font-semibold">
										{" "}
										Location
									</h1>
								</div>
								<hr className="border-black mt-1 mx-4"></hr>

								<div className="flex gap-5 justify-around px-5 mt-5">
									<div className="relative h-14 mb-3 w-1/2">
										<div>
											<select
												id="qualification_select"
												className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
												defaultValue=""
												onChange={(e) =>
													setSelectedState(
														e.target.value
													)
												}
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{states?.map((state) => (
													<option
														key={state?.id}
														value={state.id_state}
													>
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
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
													State
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
												onChange={(e) =>
													setSelectedCity(
														e.target.value
													)
												}
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{cities?.map((qualName) => (
													<option
														key={qualName?.id_city}
														value={qualName.id_city}
													>
														{qualName.city}
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
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
													City
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
								<div className="flex gap-5 px-5 mt-5">
									{/* <div className="relative h-14 mb-3 w-1/2">
										<div>
											<select
												id="qualification_select"
												className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
												defaultValue=""
											>
												<option
													value=""
													disabled
													hidden
												>
													Select
												</option>
												{town?.map((state) => (
													<option
														key={state?.id}
														value={state.id_state}
													>
														{state.town_name}
													</option>
												))}
											</select>
											<div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
											</div>
											<div
												htmlFor="floating_filled"
												className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
											>
												<img
													src={message}
													alt=""
													className="h-5 w-5"
												/>
												<label
													htmlFor=""
													className="pl-2"
												>
													Town
												</label>
											</div>
										</div>
										{errors.id_hq && (
											<div className="error text-red-600 font-medium text-sm">
												{errors?.id_hq}
											</div>
										)}
									</div> */}
									<div className="relative h-14 mb-3 w-1/2">
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
												<label
													htmlFor=""
													className="pl-2"
												>
													Pincode
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
							</>
						)}
					</form>
					{/* <div className="w-full flex items-center justify-center"> */}
					<button
						type="submit"
						className="mt-5 mb-4 rounded-full bg-blue-900 px-8 py-1 text-white"
					>
						Save
					</button>
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};

export default AddEmployment;
