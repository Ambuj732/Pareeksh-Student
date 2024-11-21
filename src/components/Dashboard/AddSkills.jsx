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
import getSectorList from "../../actions/LoginScreens/getSectorList";
import getDiffLevel from "../../actions/LoginScreens/getDiffLevel";
import getPlatforms from "../../actions/MasterDataApi/getPlatforms";
import addPublicLink from "../../actions/Dashboard/addPublicLink";
import addAccomplishment from "../../actions/Dashboard/addAccomplishment";
import addKeySkill from "../../actions/Dashboard/addKeySkill";
import addITSkill from "../../actions/Dashboard/addITSkill";
import { useDispatch, useSelector } from "react-redux";
import getKeySkills from "../../actions/MasterDataApi/getKeySkills";
import addProject from "../../actions/Dashboard/addProject";
import updateProfileSummary from "../../actions/Dashboard/updateProfileSummary";
import addCertificate from "../../actions/Dashboard/addCertificate";
import { toast } from "react-toastify";
import { recallData } from "../../store/studentProfileSlice";

const AddSkills = ({ onClose }) => {
	const user = useSelector((state) => state?.auth?.userData);
	const dispatch = useDispatch();
	console.log(user);
	const studentProfile = useSelector(
		(state) => state?.studentProfile?.studentProfileData
	);
	const { register, handleSubmit } = useForm();
	const {
		register: registerPublicLink,
		handleSubmit: handleSubmitPublicLink,
	} = useForm();
	const {
		register: registerAccomplishment,
		handleSubmit: handleSubmitAccomplishment,
	} = useForm();
	const {
		register: registerProfileSummary,
		handleSubmit: handleSubmitProfileSummary,
	} = useForm();

	const { register: registerKeySkill, handleSubmit: handleSubmitKeySkill } =
		useForm();

	const { register: registerITSkill, handleSubmit: handleSubmitITSkill } =
		useForm();

	const { register: registerProject, handleSubmit: handleSubmitProject } =
		useForm();

	const {
		register: registerCertificate,
		handleSubmit: handleSubmitCertificate,
	} = useForm();

	const [highestQualication, setHighestQualication] = useState([]);
	const [sectors, setSectors] = useState([]);
	const [diffLevel, setDiffLevel] = useState([]);
	const [errors, setErrors] = useState({});
	const [platforms, setPlatforms] = useState([]);
	const [keySkills, setKeySkills] = useState([]);

	const preData = async () => {
		try {
			const highQual = await getHighQualList();
			setHighestQualication(highQual?.data?.high_qual);
			const sector = await getSectorList();
			setSectors(sector?.data?.job_roles);
			const diffLevel = await getDiffLevel();
			setDiffLevel(diffLevel?.data?.dl);
			const platformData = await getPlatforms();
			setPlatforms(platformData?.data?.platforms);
			console.log(platformData);
			const keySkillsData = await getKeySkills();
			console.log(keySkillsData?.data?.skill_list);
			setKeySkills(keySkillsData?.data?.skill_list);
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

	const addPublicLinkHandler = async (formData) => {
		try {
			console.log(formData);
			let platformName;
			platforms?.map((pf) => {
				if (formData?.platformId == pf.id) {
					console.log(pf);
					platformName = pf.platform_name;
				}
			});
			console.log(formData?.platformId);
			console.log(platformName);
			const data = {
				id_platform: formData?.platformId,
				platform_name: platformName,
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
				profile_link: formData?.publicLink,
			};
			console.log(data);
			const response = await addPublicLink(data);
			if (response?.data?.code ===1000) {
				dispatch(recallData())
				toast.success("Public link added successfully!");
				onClose();
				
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding public link :: ", error);
		}
	};

	const addAccomplishmentHandler = async (formData) => {
		try {
			console.log(formData);
			const data = {
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
				accomplishment: formData?.accomplishment,
			};
			console.log(data);
			const response = await addAccomplishment(data);
			if (response?.data?.code === 1000) {
				dispatch(recallData())
				toast.success("Accomplishment added successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding accomplishment :: ", error);
		}
	};

	const addKeySkillHandler = async (formData) => {
		try {
			const data = {
				id_skill: 4,
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
			};
			console.log(data);
			const response = await addKeySkill(data);
			if (response?.data?.code === 1000) {
				dispatch(recallData())
				toast.success("Key skill added successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding key skills :: ", error);
		}
	};

	const addITSkillHandler = async (formData) => {
		try {
			console.log(formData);
			const data = {
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
				last_used: formData?.lastUsed,
				software_name: formData?.softwareName,
				experience: formData?.experience,
				//id_software:1
				//id_it_skill:3
			};
			console.log(data);
			const response = await addITSkill(data);
			if (response?.data?.code === 1000) {
				
				dispatch(recallData())
				toast.success("IT Skill added successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding IT Skill :: ", error);
		}
	};

	const addProjectHandler = async (formData) => {
		try {
			const data = {
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
				end_date: formData?.endDate,
				role: formData?.role,
				name: formData?.name,
				desc: formData?.desc,
				start_date: formData?.startDate,
				//id_student_project:2
			};
			console.log(data);
			const response = await addProject(data);
			if (response?.data?.code === 1000) {
				dispatch(recallData())
				toast.success("Project added successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding project :: ", error);
		}
	};

	const updateProfileSummaryHandler = async (formData) => {
		try {
			console.log(formData);
			const data = {
				profile_summary: formData?.summary,
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
			};
			console.log(data);
			const response = await updateProfileSummary(data);
			if (response?.data?.code === 1000) {
				dispatch(recallData())
				toast.success("Profile summary updated successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while updating profile summary :: ", error);
		}
	};

	const fileToBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result.split(",")[1]);
			reader.onerror = (error) => reject(error);
		});
	};

	const addCertificateHandler = async (formData) => {
		try {
			console.log(formData);
			const startDate = new Date(formData?.startDate);
			const endDate = new Date(formData?.completionDate);
			console.log(startDate?.getMonth());

			const file = await fileToBase64(formData?.certificateFile[0]);

			const data = {
				id_self_student: user?.id_self_student,
				usercode: user?.usercode,
				cert_provider: formData?.certificateProvider, // p
				cert_name: formData?.certificateName, // p
				cert_completion_id: formData?.certificateId, // p
				completion_year: formData?.completionYear, // p
				can_expiry: formData?.expiry ? 1 : 0, // p
				start_month: startDate?.getMonth() + 1, // p
				start_year: startDate?.getFullYear(), // p
				end_month: endDate?.getMonth() + 1,
				end_year: endDate?.getFullYear(),
				direct_url: formData?.url ? 1 : 0, // p
				cert_url: formData?.url,
				doc_type:
					formData?.certificateFile[0]?.type == "image/png" ? 1 : 2,
				file: formData?.certificateFile[0],
				file_name: formData?.certificateFile[0]?.name,
			};
			console.log(data);
			const response = await addCertificate(data);
			if (response?.data?.code === 1000) {
				dispatch(recallData())
				toast.success("Certificate added successfully!");
				onClose();
			}
			console.log(response);
		} catch (error) {
			console.log("Error while adding certificate :: ", error);
		}
	};

	return (
		<div className=" flex h-screen w-screen items-center justify-center  fixed top-0 left-0 z-50 bg-black bg-opacity-50 ">
			<div className="w-1/2 h-2/3 rounded-md shadow-lg ">
				<div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
					<h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
						Add Skills
					</h1>
					<img
						className="mr-8 items-center mt-2 h-8  cursor-pointer"
						src={close}
						onClick={onClose}
						alt=""
					/>
				</div>
				<div className="overflow-y-scroll h-[90%] bg-white">
					<div className="flex gap-5 justify-around px-5 mt-2">
						<div className="relative h-14 mb-3 w-1/2">
							<div>
								<select
									id="qualification_select"
									className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
									defaultValue=""
									{...register("headline", {
										required: true,
									})}
								>
									<option value="" disabled hidden>
										Information and Tech
									</option>
									{sectors?.map((sectorName) => (
										<option
											key={sectorName?.id}
											value={sectorName.id}
										>
											{sectorName.job_role}
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
										Sector
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
										Master in CSA
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
										Qualification
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
					<div className="flex gap-5 justify-around px-5 mt-2">
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
										1
									</option>
									{diffLevel?.map((dflevel) => (
										<option
											key={dflevel?.id}
											value={dflevel.id}
										>
											{dflevel.level_difficulty_name}
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
										Level
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
						<h1 className="px-5 mt-16 font-semibold">
							Update Profile Summary
						</h1>
					</div>
					<form
						onSubmit={handleSubmitProfileSummary(
							updateProfileSummaryHandler
						)}
						className="flex flex-col justify-around px-5 mt-2 gap-5"
					>
						<div className="relative h-12 w-full">
							<div>
								<input
									type="text"
									id="floating_filled"
									className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
									placeholder=""
									{...registerProfileSummary("summary", {
										required: true,
									})}
								/>
								<div
									htmlFor="floating_filled"
									className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
								>
									<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
									<label htmlFor="" className="pl-2">
										Profile Summary
									</label>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-16 font-semibold">
							Add Accomplishments
						</h1>
					</div>
					<form
						onSubmit={handleSubmitAccomplishment(
							addAccomplishmentHandler
						)}
						className="flex flex-col justify-around px-5 mt-2"
					>
						<div className="flex mb-6">
							<div className="relative h-12 w-full">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerAccomplishment(
											"accomplishment",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Accomplishments
										</label>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-16 font-semibold">
							Add Public Links
						</h1>
					</div>
					<form
						onSubmit={handleSubmitPublicLink(addPublicLinkHandler)}
						className="flex flex-col justify-around px-5 mt-2"
					>
						<div className="flex gap-5 justify-around">
							<div className="relative h-14 mb-3 w-1/3">
								<div>
									<select
										id="qualification_select"
										className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
										defaultValue=""
										{...registerPublicLink("platformId", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Select
										</option>
										{platforms?.map((platform) => (
											<option
												key={platform?.id}
												value={platform?.id}
											>
												{platform.platform_name}
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
											Public Links
										</label>
									</div>
								</div>
								{errors.id_hq && (
									<div className="error text-red-600 font-medium text-sm">
										{errors?.id_hq}
									</div>
								)}
							</div>
							<div className="relative h-12 w-2/3">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerPublicLink("publicLink", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Public Link
										</label>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-16 font-semibold">
							Add Key Skills
						</h1>
					</div>
					<form
						onSubmit={handleSubmitKeySkill(addKeySkillHandler)}
						className="flex flex-col justify-around px-5 mt-2"
					>
						<div className="flex">
							<div className="relative h-14 mb-3 w-1/2">
								<div>
									<select
										id="qualification_select"
										className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
										defaultValue=""
										{...registerKeySkill("skill", {
											required: true,
										})}
									>
										<option value="" disabled hidden>
											Select
										</option>
										{keySkills?.map((qualName) => (
											<option
												key={qualName?.id}
												value={qualName.id}
											>
												{qualName.skill_name}
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
											Key Skill
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
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-16 font-semibold">
							Add IT Skills
						</h1>
					</div>
					<hr className="border-black mt-1 mx-4"></hr>
					<form
						onSubmit={handleSubmitITSkill(addITSkillHandler)}
						className="flex flex-col "
					>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerITSkill("softwareName", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Software Name
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
										{...registerITSkill("experience", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Experience (months)
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex  px-5 mt-5 mb-4">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerITSkill("lastUsed", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Last Used (Year)
										</label>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 w-1/4 ml-5"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-7 font-semibold">
							Add Projects
						</h1>
					</div>
					<hr className="border-black mt-1 mx-4"></hr>
					<span className="px-5 font-sans text-sm text-slate-400">
						Add Project to show your Experience
					</span>
					<form onSubmit={handleSubmitProject(addProjectHandler)}>
						<div className="flex gap-5 justify-around px-5 mt-2">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerProject("name", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Project Name
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
										{...registerProject("role", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Role in Project
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="date"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerProject("startDate", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Start Date
										</label>
									</div>
								</div>
							</div>
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="date"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerProject("endDate", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											End Date
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5 mb-5">
							<div className="relative h-12 w-full">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerProject("desc", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Description
										</label>
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="text-white font-sans text-lg  px-8 py-1 rounded-full ml-5 bg-blue-800 w-1/4"
						>
							Save
						</button>
					</form>
					<div>
						<h1 className="px-5 mt-10 font-semibold">
							Certification
						</h1>
					</div>
					<hr className="border-black mt-1 mx-4"></hr>
					<span className="px-5 font-sans text-sm text-slate-400">
						Show your skills via Certification benchmark
					</span>
					<form
						onSubmit={handleSubmitCertificate(
							addCertificateHandler
						)}
					>
						{
							// can_expiry: formData?.expiry, // p
							// start_month: formData?.startMonth, // p
							// start_year: formData?.startYear, // p
							// end_month: formData?.endMonth,
							// end_year: formData?.endYear,
							// direct_url: formData?.url, // p
							// //cert_url:www.google.com/certificate/RT34Df.pdf
							// doc_type: formData?.docType,
							// file: formData?.file,
							// file_name: formData?.fileName,
						}
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate(
											"certificateName",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Certification Name
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
										{...registerCertificate(
											"certificateProvider",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Certificate Provider
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate(
											"certificateId",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Certificate ID
										</label>
									</div>
								</div>
							</div>
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="date"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate("startDate", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Start Date
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate("url", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Certificate URL
										</label>
									</div>
								</div>
							</div>
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="date"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate(
											"completionDate",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											End Date
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="relative h-14 w-1/2 border flex items-center justify-center rounded-md font-medium text-[#1C4481] cursor-pointer">
								<input
									type="file"
									name=""
									id="certificateFile"
									{...registerCertificate("certificateFile")}
								/>
								<label htmlFor="certificateFile">
									Upload Certificate
								</label>
							</div>
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate(
											"completionYear",
											{
												required: true,
											}
										)}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Completion Year
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="flex gap-5 justify-around px-5 mt-5">
							<div className="h-12 flex items-center gap-2">
								<input
									type="checkbox"
									name=""
									id=""
									{...registerCertificate("expiry")}
								/>
								<label htmlFor="">Expiry</label>
							</div>
							<div className="relative h-12 w-1/2">
								<div>
									<input
										type="text"
										id="floating_filled"
										className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
										placeholder=""
										{...registerCertificate("upto", {
											required: true,
										})}
									/>
									<div
										htmlFor="floating_filled"
										className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
									>
										<IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
										<label htmlFor="" className="pl-2">
											Upto
										</label>
									</div>
								</div>
							</div>
						</div>

						<button className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800 ml-5 mt-5 mb-4">
							{" "}
							Save
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddSkills;
