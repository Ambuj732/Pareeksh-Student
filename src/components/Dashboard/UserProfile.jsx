import React, { useState } from "react";
import pen from "../../assets/Dashboard/pen.png";
import { Outlet, useLocation } from "react-router";
import EditProfile from "./EditProfile";
import AddEducation from "./AddEducation";
import EditProfileUpdate from "./EditProfileUpdate";
import AddEmployment from "./AddEmployment";
import AddSkills from "./AddSkills";
import AddResume from "./AddResume";
import AddCareerProfile from "./AddCareerProfile";

function UserProfile() {
	const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
	const [isAddEducationModalOpen, setIsAddEducationModalOpen] =
		useState(false);
	const [isEditProfileUpdateModalOpen, setIsEditProfileUpdateModalOpen] =
		useState(false);
	const [isAddEmployment, setAddEmployment] = useState(false);
	const [isSkills, setIsSkills] = useState(false);
	const [isAddResume, setIsAddResume] = useState(false);
	const [isAddCareerProfile, setIsAddCareerProfile] = useState(false);

	const [educations, setEducations] = useState([]);

	const location = useLocation();

	const handleEditProfileClick = () => {
		setIsEditProfileModalOpen(true);
	};

	const handleAddEducationClick = () => {
		setIsAddEducationModalOpen(true);
	};
	const handleEditProfileUpdateClick = () => {
		setIsEditProfileUpdateModalOpen(true);
	};
	const handleAddEmployment = () => {
		setAddEmployment(true);
	};

	const handleSkills = () => {
		setIsSkills(true);
	};

	const handleAddResume = () => {
		setIsAddResume(true);
	};

	const handleAddCareerProfile = () => {
		setIsAddCareerProfile(true);
	};

	const handleCloseModals = () => {
		setIsEditProfileModalOpen(false);
		setIsAddEducationModalOpen(false);
		setIsEditProfileUpdateModalOpen(false);
		setIsEditProfileUpdateModalOpen(false);
		setAddEmployment(false);
		setIsSkills(false);
		setIsAddResume(false);
		setIsAddCareerProfile(false);
	};

	const handleSaveEducation = (data) => {
		console.log("Education data received: ", data);
		setEducations((prevEducations) => [...prevEducations, data]);
	};

	return (
		<div className="p-4">
			<div className="bg-white p-4 rounded-3xl flex flex-col gap-4 pb-40">
				<div className="flex justify-between text-[#1C4481] font-semibold text-lg px-4 h-12 items-center rounded-md bg-[#EAF2FE]">
					<span>Profile Update</span>
					{location.pathname ===
						"/dashboard/student-profile/personal-details/personal-update" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1 flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleEditProfileClick}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">Edit</span>
							</div>
						)}
					{location.pathname ===
						"/dashboard/student-profile/education-profile" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-30 justify-center p-1 flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleAddEducationClick}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">
									Add Education
								</span>
							</div>
						)}
					{location.pathname ===
						"/dashboard/student-profile/profile-update" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1 flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleEditProfileUpdateClick}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">Edit</span>
							</div>
						)}
					{location.pathname ===
						"/dashboard/student-profile/employment" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-30 justify-center p-1 py-1 flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleAddEmployment}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">
									Add More Employment
								</span>
							</div>
						)}

					{location.pathname ===
						"/dashboard/student-profile/skills" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1  flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleSkills}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">Edit</span>
							</div>
						)}

					{location.pathname ===
						"/dashboard/student-profile/resume" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1  flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleAddResume}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">Edit</span>
							</div>
						)}

					{location.pathname ===
						"/dashboard/student-profile/career-profile" && (
							<div
								className="bg-[#1C4481] items-center rounded-full px-2 w-20 justify-center p-1  flex gap-1 text-white h-8 cursor-pointer"
								onClick={handleAddCareerProfile}
							>
								<img src={pen} alt="Edit" className="h-5" />
								<span className="text-sm font-normal">Edit</span>
							</div>
						)}
				</div>
				{isEditProfileModalOpen && (
					<EditProfile onClose={handleCloseModals} />
				)}
				{isAddEducationModalOpen && (
					<AddEducation
						onClose={handleCloseModals}
						onSave={handleSaveEducation}
					/>
				)}
				{isEditProfileUpdateModalOpen && (
					<EditProfileUpdate onClose={handleCloseModals} />
				)}
				{isAddEmployment && (
					<AddEmployment onClose={handleCloseModals} />
				)}
				{isSkills && <AddSkills onClose={handleCloseModals} />}
				{isAddResume && <AddResume onClose={handleCloseModals} />}
				{isAddCareerProfile && (
					<AddCareerProfile onClose={handleCloseModals} />
				)}

				<Outlet />
			</div>
		</div>
	);
}

export default UserProfile;
