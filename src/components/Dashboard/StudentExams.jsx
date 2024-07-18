import React, { useEffect, useState } from "react";
import mock from "/mock.png";
import start from "/start.png";
import pack from "/pack.png";
import code from "/code.png";
import duration from "/duration.png";
import passcode from "/passcode.png";
import banner1 from "/banner1.png";
import digital from "/digital.png";
import gamer from "/gamer.png";
import practice from "../../assets/Dashboard/practice.png";
import icon from "../../assets/Dashboard/icon.png";
import attempted from "../../assets/Dashboard/attempted.png";
import dashboardExamList from "../../actions/MasterDataApi/dashboardExamList";
import ExamFeeDetails from "./ExamFeeDetails";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function StudentExams() {
	const [examList, setExamList] = useState(null);
	const [freeExams, setFreeExams] = useState(false);
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();
	const getDashboardExamList = async () => {
		try {
			const user = JSON.parse(localStorage.getItem("ps_loguser"));
			console.log("User :: ", user);
			const data = {
				usercode: user.usercode,
				id_self_student: user.id_self_student,
			};
			const response = await dashboardExamList(data); 
			//console.log(response);
			if (response?.data?.code === 1000)
				setExamList(response?.data?.exams);

			//console.log(examList);
		} catch (error) {
			console.log("Error while getting data :: ", error);
			setErrors([error.message]);
		}
	};

	const handleBuyClick = () => {
		localStorage.setItem("examfee", JSON.stringify(examList));
		navigate("/dashboard/examfeedetails/");
	};

	useEffect(() => {
		getDashboardExamList();
	}, []);
	return (
		<div>
			<div className="w-full flex  gap-8 px-8">
				<div
					className={`h-10 rounded-full justify-center border w-44 flex items-center gap-3 cursor-pointer ${
						!freeExams
							? "bg-[#1C4481] text-white"
							: "bg-white text-[#1C4481] border-[#1C4481] "
					}`}
				>
					<span
						className=" font-medium"
						onClick={() => {
							setFreeExams(false);
						}}
					>
						Free Exams
					</span>
				</div>
				<div
					className={`h-10 rounded-full justify-center border w-44 flex items-center gap-3 cursor-pointer ${
						!freeExams
							? "bg-white text-[#1C4481] border-[#1C4481] "
							: "bg-[#1C4481] text-white "
					}`}
				>
					<span
						className=" font-medium"
						onClick={() => {
							setFreeExams(true);
						}}
					>
						Paid Exams
					</span>
				</div>
			</div>

			<div className="flex items-center">
				<div className="w-4/6 mx-4 p-4 h-fit flex flex-col gap-4">
					{examList &&
						examList?.map(
							(exam) =>
								exam.paid_type === 0 &&
								freeExams == false && (
									<>
										<div className="w-full h-40 bg-white rounded-3xl">
											<div className="flex h-1/2 items-center justify-between p-6">
												<div className="flex flex-col">
													<span>
														<span className="text-[#1C4481] font-semibold">
															Exam -
														</span>
														{exam.exam_name}
													</span>
													<span className="text-sm text-[#1C4481] font-medium">
														Sector - {exam.sector}
													</span>
												</div>
												<div className="flex items-center bg-[#1C4481] h-10 w-28 rounded-full justify-center">
													<div className="flex items-center gap-2">
														<span className="text-white ">
															Start
														</span>
														<img
															src={start}
															alt=""
														/>
													</div>
												</div>
											</div>
											<hr class="border-t-[1px] border-[#1C4481]" />
											<div className="flex justify-between p-6  text-[#1C4481]">
												<div className="flex items-center gap-2">
													<img
														src={pack}
														alt=""
														className="h-8"
													/>
													<div className="flex flex-col text-[12px]">
														<span>
															Qualification Pack
														</span>
														<span className="font-semibold">
															{exam.subject_name}
														</span>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<img
														src={code}
														alt=""
														className="h-8"
													/>
													<div className="flex flex-col text-[12px]">
														<span>
															Qualification Code
														</span>
														<span className="font-semibold">
															{exam.subject_code}
														</span>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<img
														src={duration}
														alt=""
														className="h-8"
													/>
													<div className="flex flex-col text-[12px]">
														<span>
															Exam Duration
														</span>
														<span className="font-semibold">
															{exam.duration} Mins
														</span>
													</div>
												</div>
												<div className="flex items-center gap-2">
													<img
														src={passcode}
														alt=""
														className="h-8"
													/>
													<div className="flex flex-col text-[12px]">
														<span>
															Exam Passcode
														</span>
														<span className="font-semibold">
															{exam.passcode}
														</span>
													</div>
												</div>
											</div>
										</div>
									</>
								)
						)}
					{examList &&
						examList.map(
							(exam) =>
								exam.paid_type === 1 &&
								freeExams == true && (
									<div className="w-full h-40 bg-[#FFED8C]  rounded-3xl    mt-4 ">
										<div className="flex h-1/2 items-center  justify-around p-4">
											<div className="flex flex-col">
												<span>
													<span className="text-[#1C4481] font-semibold">
														Exam-
														{exam.exam_name}
													</span>
												</span>
												<span className="text-sm text-[#1C4481] font-medium">
													Sector -{exam.sector}
												</span>
											</div>
											<div className="flex items-center gap-5 ml-[300px] font-custom">
												<span className="font-medium text-2xl">
													RS.
													{exam.exam_fee.exam_fee}
												</span>
												<Link
													to={`/dashboard/examfeedetails/${exam.id_exam}`}
												>
													<div className="flex items-center bg-[#f5f5f7] h-10 w-28 cursor-pointer rounded-full justify-center">
														<div className="flex items-center gap-2">
															<span
																className="text-black font-semibold text-1xl "
																onClick={
																	handleBuyClick
																}
															>
																Buy
															</span>
														</div>
													</div>
												</Link>
												<img
													className="h-7 w-7"
													src={icon}
													alt=""
												/>
											</div>
										</div>
										<hr class="border-t-[1px] border-[#1C4481]" />
										<div className="flex justify-between p-6  text-[#1C4481]">
											<div className="flex items-center gap-2">
												<img
													src={pack}
													alt=""
													className="h-8"
												/>
												<div className="flex flex-col text-[12px]">
													<span>
														Qualification Pack
													</span>
													<span className="font-semibold">
														{exam.subject_name}
													</span>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<img
													src={code}
													alt=""
													className="h-8"
												/>
												<div className="flex flex-col text-[12px]">
													<span>
														Qualification Code
													</span>
													<span className="font-semibold">
													{exam.subject_code}
													</span>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<img
													src={duration}
													alt=""
													className="h-8"
												/>
												<div className="flex flex-col text-[12px]">
													<span>Exam Duration</span>
													<span className="font-semibold">
														12 Mins
													</span>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<img
													src={passcode}
													alt=""
													className="h-8"
												/>
												<div className="flex flex-col text-[12px]">
													<span>Exam Passcode</span>
													<span className="font-semibold">
														{exam.passcode}
													</span>
												</div>
											</div>
										</div>
									</div>
								)
						)}

					<div className="flex items-center justify-center mb-8">
						<img src={digital} alt="" className="w-5/6" />
					</div>
				</div>
				<div className="flex flex-col gap-8 items-center bg-white w-[300px] p-8 rounded-3xl">
					<img src={gamer} alt="" className="h-56" />
					<img src={gamer} alt="" className="h-56" />
				</div>
			</div>
		</div>
	);
}

export default StudentExams;
