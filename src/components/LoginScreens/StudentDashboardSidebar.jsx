import React, { useEffect, useState } from "react";
import logo from "../../assets/LoginScreen/logo.png";
import dashboard from "../../assets/LoginScreen/Dashboard.png";
import user from "../../assets/LoginScreen/userDashboard.png";
import stat from "../../assets/LoginScreen/Stat.png";
import signout from "../../assets/LoginScreen/signout.png";
import leftBanner from "../../assets/LoginScreen/leftBanner.png";
import transition from "../../assets/Dashboard/transition.png";
import angleUp from "../../assets/Dashboard/angleUp.png";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../actions/LoginScreens/logout";
import { useDispatch } from "react-redux";
import { pushStudentProfile } from "../../store/studentProfileSlice";
import { login as authLogin } from "../../store/authSlice";

function StudentDashboardSidebar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("ps_loguser"));
		if (user) dispatch(authLogin(user));
		const studentProfile = JSON.parse(
			localStorage.getItem("student_profile")
		);
		if (studentProfile) dispatch(pushStudentProfile(studentProfile));
	}, []);

	const logoutHandler = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("ps_loguser"));
			const data = {
				usercode: user?.usercode,
				id_self_student: user?.id_self_student,
			};
			console.log("Logout Response ");
			navigate("/");
			const response = await logout(data);
		} catch (error) {
			console.log("Error while logging out user :: ", user);
		}
	};

	return (
		<div className="bg-[#1C4481] min-h-screen w-1/5 flex flex-col justify-between overflow-y-scroll no-scrollbar">
			<div>
				<img src={logo} alt="" className="h-20" />
				<div className="py-4 flex flex-col">
					<Link to={"/dashboard/exams"}>
						<div className="flex items-center cursor-pointer w-4/5 h-12 rounded-e-full bg-white text-[#1C4481] gap-2 py-2 px-4">
							<img src={dashboard} alt="" />
							<span className="font-semibold">Dashboard</span>
						</div>
					</Link>
					<div
						onClick={() => {
							const open = isMenuOpen;
							setIsMenuOpen(!open);
						}}
						className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 justify-between py-2 px-4 cursor-pointer"
					>
						<div className="flex items-center gap-2">
							<img src={user} alt="" />
							<span className="">Profile</span>
						</div>
						<img src={angleUp} alt="" />
					</div>
					{isMenuOpen && (
						<div className="flex flex-col items-center">
							<Link
								to={
									"/dashboard/student-profile/personal-details/personal-update"
								}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">
											Personal Profile
										</span>
									</div>
								</div>
							</Link>
							<Link
								to={"/dashboard/student-profile/profile-update"}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">
											Personal Update
										</span>
									</div>
								</div>
							</Link>
							
							<Link
								to={
									"/dashboard/student-profile/education-profile"
								}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">
											Education Profile
										</span>
									</div>
								</div>
							</Link>
							<Link
								to={"/dashboard/student-profile/employment"}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">Employment</span>
									</div>
								</div>
							</Link>
							<Link
								to={"/dashboard/student-profile/skills"}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">Skills</span>
									</div>
								</div>
							</Link>
							<Link
								to={"/dashboard/student-profile/resume"}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">Resume</span>
									</div>
								</div>
							</Link>
							<Link
								to={"/dashboard/student-profile/career-profile"}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">Career Profile</span>
									</div>
								</div>
							</Link>
							<Link
								to={
									"/dashboard/student-profile/change-password"
								}
								className="w-4/5 h-12"
							>
								<div className="flex items-center w-full h-12 rounded-e-full text-white gap-2 py-2 px-4">
									<div className="flex items-center gap-2">
										<img src={user} alt="" />
										<span className="">
											Change Password
										</span>
									</div>
								</div>
							</Link>
						</div>
					)}

					<Link>
						<div className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4">
							<img src={transition} alt="" />
							<span className="">Transition</span>
						</div>
					</Link>
					<Link to={"/dashboard/student-profile/sectors"}>
						<div className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4">
							<img src={stat} alt="" />
							<span className="">Sectors</span>
						</div>
					</Link>

					<div
						onClick={logoutHandler}
						className="flex items-center w-4/5 h-12 rounded-e-full text-white gap-2 py-2 px-4 cursor-pointer"
					>
						<img src={signout} alt="" />
						<span onClick={logoutHandler}>Logout</span>
					</div>
				</div>
			</div>
			<img src={leftBanner} alt="" className="p-4" />
		</div>
	);
}

export default StudentDashboardSidebar;
