import React, { useEffect, useState } from "react";
import person from "../../assets/Dashboard/person.png";
import gender from "../../assets/Dashboard/gender.png";
import date from "../../assets/Dashboard/date.png";
import email from "../../assets/Dashboard/email.png";
import mobile from "../../assets/Dashboard/mobile.png";
import user from "../../assets/Dashboard/user.png";
import getStudentProfile from "../../actions/Dashboard/getStudentProfile";
import profilePercentage from "../../actions/Dashboard/profilePercentage";
import EditProfile from "./EditProfile";
import formatDate from "../../utils/formatDate";
import UserProfile from "./UserProfile";

function PersonalUpdate() {
	const [studentProfile, setStudentProfile] = useState({});
	const [modelOpen, setModelOpen] = useState(false);

	const getStudentProfileHandler = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("ps_loguser"));
			console.log("User :: ", user);
			const data = {
				usercode: user.usercode,
				id_self_student: user.id_self_student,
			};
			const response = await getStudentProfile(data);
			if (response?.data?.code === 1000 && response?.data?.profile) {
				setStudentProfile(response?.data?.profile);
				localStorage.setItem(
					"student_profile",
					JSON.stringify(response.data.profile)
				);
				console.log("Response :: ", response.data.profile);
			}
		} catch (error) {
			console.log("Error while getting student profile :: ", error);
		}
	};

	// const getProfilePercentage = async () => {
	// 	try {
	// 		const response = await profilePercentage();
	// 	} catch (error) {
	// 		console.log("Error while getting profile percentage :: ", error);
	// 	}
	// };

	useEffect(() => {
		getStudentProfileHandler();
	}, []);

	const formatGender = (gender) => {
		if (gender === 1) {
			return "Male";
		} else if (gender === 2) {
			return "Female";
		} else return "Transgender";
	};

	function extractName(fullName, label) {
		// Check if fullName is empty
		if (!fullName) {
			return "Full name is empty.";
		}

		const names = fullName.split(" ");
		if (label.toLowerCase() === "firstname") {
			return names[0];
		} else if (label.toLowerCase() === "lastname") {
			return names[names.length - 1];
		} else {
			return "Invalid label. Please provide 'firstname' or 'lastname'.";
		}
	}

	return (
		<div className="flex flex-col w-2/3 gap-8">
			<div className="flex items-center">
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={person} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							First Name
						</span>
					</div>
					<input
						disabled
						type="text"
						value={
							studentProfile &&
							extractName(
								studentProfile.student_name,
								"firstname"
							)
						}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium d"
					/>
				</div>
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={person} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							Last Name
						</span>
					</div>
					<input
						disabled
						type="text"
						value={
							studentProfile &&
							extractName(studentProfile.student_name, "lastname")
						}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={gender} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							Please Select Gender
						</span>
					</div>
					<input
						disabled
						type="text"
						value={
							studentProfile &&
							formatGender(studentProfile.gender)
						}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={date} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							Date of Birth*
						</span>
					</div>
					<input
						disabled
						type="text"
						value={
							studentProfile &&
							formatDate(studentProfile.date_of_birth)
						}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={email} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">Email ID</span>
					</div>
					<input
						disabled
						type="text"
						value={studentProfile && studentProfile.email_id}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={mobile} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							Mobile Number
						</span>
					</div>
					<input
						disabled
						type="text"
						value={studentProfile && studentProfile.mobile_no}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
			</div>
			<div className="flex items-center">
				<div className="flex flex-col gap-2 w-1/2">
					<div className="flex items-center gap-2">
						<img src={user} alt="" className="h-4" />
						<span className="text-sm text-[#1C4481]">
							User Name
						</span>
					</div>
					<input
						disabled
						type="text"
						value={studentProfile && studentProfile.user_name}
						className="outline-none shadow-customShadow rounded-md h-9 px-4 w-5/6 text-md	 font-medium"
					/>
				</div>
			</div>
		</div>
	);
}

export default PersonalUpdate;
