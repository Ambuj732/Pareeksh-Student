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
// import getApiData from "../../actions/LoginScreens/getApiData";
import { id } from "date-fns/locale";
import getCities from "../../actions/LoginScreens/getCities";
// import updateDataCommon from "../../actions/Dashboard/updateDataCommon";

const AddCareerProfile = ({ onClose }) => {
	const { register, handleSubmit } = useForm();
	const [highestQualication, setHighestQualication] = useState([]);
	const [errors, setErrors] = useState({});

	const preData = async () => {
		try {
			const highQual = await getHighQualList();
			setHighestQualication(highQual?.data?.high_qual);
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
					<form>
						<div className="flex gap-5 justify-around px-5 mt-2">
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
						</div>
						<div className="flex gap-5 justify-around px-5 mt-7">
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
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Information Technology
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Android Developer
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Permanent
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Full Time
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Permanament
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											8-12 lakhs
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											UttarPradesh
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
										onChange={(e) =>
											handleSelectQualification(
												e.target.value
											)
										}
										{...register("qualification", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Kanpur
										</option>
										{highestQualication?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.highest_qualification}
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
