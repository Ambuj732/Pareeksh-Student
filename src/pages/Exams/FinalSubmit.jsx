import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import logout from "/logout.png";
import questionMark from "/questionMark.png";
import Chart from "chart.js/auto";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Doughnut } from "react-chartjs-2";
import vivaExamSubmit from "../../actions/Passcode/vivaExamSubmit";
import Swal from "sweetalert2";
import ThankYou from "../../components/Exams/ThankYou";
import InstructionPage from "../../components/Exams/InstructionPage.jsx";

function FinalSubmit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [exam, setExam] = useState({});
  const [studentProfile, setStudentProfile] = useState({});
  const [attempted, setAttempted] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [thankYouModal, setThankYouModal] = useState(false);
  const [instructionPages, setInstructionPages] = useState(false);

  const [data, setData] = useState({
    labels: ["Attempted", "Not Attempted"],
    datasets: [
      {
        label: "Questions",
        data: [0, 0],
        backgroundColor: ["#A0C279", "#EBA6A8", "rgb(255, 205, 86)"],
        borderColor: "#ffffff",
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    console.log("User :: ", user);
    const examDetails = JSON.parse(sessionStorage.getItem("pkshn_exam_set"));
    setExam(examDetails);
    console.log(examDetails);
    setUser(user);
    const ps_attempted = localStorage.getItem("ps_attempted");
    const ps_totalq = localStorage.getItem("ps_totalq");
    const totalq = ps_totalq ? JSON.parse(ps_totalq) : 0;
    console.log(ps_attempted);
    console.log(ps_totalq);
    setTotalQuestion(totalq);
    const attempted = ps_attempted ? JSON.parse(ps_attempted) : [];
    let attemptedCount = 0;
    for (let i = 0; i < attempted.length; i++) {
      if (attempted[i] === true) {
        attemptedCount++;
      }
    }
    setAttempted(attemptedCount);

    // Update the data for the chart
    setData((prevData) => ({
      ...prevData,
      datasets: [
        {
          ...prevData.datasets[0],
          data: [attemptedCount, totalq - attemptedCount],
        },
      ],
    }));
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const vivaFinalExamSubmitHandler = async () => {
    try {
      if (totalQuestion - attempted != 0) {
        Swal.fire({
          text: "This is a mandatory exam. You have to attempt all questions. Please press back button to go back and submit all questions.",
          icon: "warning",
        });
        return;
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to exit from exam!!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Submit Exam",
        }).then((result) => {
          if (result.isConfirmed) {
            setThankYouModal(true);
          }
        });
      }

      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        student_id: user?.id,
      };
      console.log(data);
      const response = await vivaExamSubmit(data);
      if (response?.data?.code === 1000) {
        localStorage.removeItem("id_self_student");
        localStorage.removeItem("instruction");
        localStorage.removeItem("pkshn_profileData");
        localStorage.removeItem("ps_attempted");
        localStorage.removeItem("ps_loguser");
        localStorage.removeItem("ps_totalq");
        localStorage.removeItem("supspw_geoIPStu");
        sessionStorage.removeItem("pkshn_exam_set");
      }
      console.log(response);
    } catch (error) {
      console.log("Error while submitting viva exam :: ", error);
    }
  };

  const profile_Data = JSON.parse(localStorage.getItem("pkshn_profileData"));
  const instructionPage = () => {
    setInstructionPages(true);
  };

  const closeModal = () => {
    setInstructionPages(false);
  };

  return (
    <div className="h-screen font-custom">
      {thankYouModal && <ThankYou />}
      <div className="h-20 bg-[#305187] px-8 flex items-center justify-between overflow-x-hidden">
        <img src={logo} alt="" className="h-4/5 my-auto" />
        <div className="flex  gap-6">
          <div className="flex items-center justify-around py-1 gap-2 bg-[#FEFEFF1A] rounded-full h-14 w-[200px] px-2 pr-8">
            <img
              src={profile_Data?.pic}
              alt=""
              className="h-11 w-16 object-contain rounded-full"
            />
            <div className="flex flex-col font-medium text-white">
              <span className="w-[150px]">{profile_Data?.name}</span>
              {/* <span>{studentProfile?.id}</span> */}
            </div>
          </div>
          <div className="flex gap-3 h-14">
            <img
              src={logout}
              alt=""
              // onClick={logoutHandler}
              className="cursor-pointer"
            />
            <img
              src={questionMark}
              alt=""
              className="cursor-pointer"
              onClick={instructionPage}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between pt-4 px-8 items-center">
          <span className="text-2xl font-medium text-[#1C4481]">
            Final Submit
          </span>
        </div>
        <div className="h-fit p-4 bg-zinc-100 rounded-3xl mx-8 flex flex-col gap-4">
          <div className="flex items-center  px-8 p-4 gap-2">
            <FaArrowLeft
              className="bg-[#1C4481] rounded-full h-6 w-6 text-white p-1 cursor-pointer"
              onClick={handleBack}
            />
            <span>Back</span>
          </div>
          <div className="h-80 border-2 border-neutral-300 w-2/3 mx-auto rounded-3xl flex items-center">
            <div className="w-1/2 px-8 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <span className="text-xl text-[#1C4481]">Total Question</span>
                <span className="text-7xl text-[#3A3A3A]">{totalQuestion}</span>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col border h-fit p-1 px-2 rounded-lg justify-center w-36 bg-[#A0C279] text-[#334E15] font-semibold">
                  <span>Attempted</span>
                  <span className="text-2xl">{attempted || 0}</span>
                </div>
                <div className="flex flex-col border h-fit p-1 px-2 rounded-lg justify-center w-36 bg-[#EBA6A8] text-[#334E15] font-semibold">
                  <span>Not Attempted</span>
                  <span className="text-2xl">
                    {totalQuestion - attempted || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-1/2 max-h-full p-4">
              {data && <Doughnut data={data} />}
            </div>
          </div>
          <div
            className="flex items-center justify-center"
            onClick={vivaFinalExamSubmitHandler}
          >
            <button className="h-12 w-52 bg-[#1C4481] rounded-full font-medium text-white mx-auto">
              Submit & Exit
            </button>
          </div>
        </div>
        {instructionPages && <InstructionPage closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default FinalSubmit;
