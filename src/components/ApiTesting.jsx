import React from "react";
import changePassword from "../actions/Dashboard/changePassword";
import profilePercentage from "../actions/Dashboard/profilePercentage";
import updatePersonal from "../actions/Dashboard/updatePersonal";
import updateMobile from "../actions/Dashboard/updateMobile";
import studentLanguages from "../actions/Dashboard/studentLanguages";
import addStudentLanguage from "../actions/Dashboard/addStudentLanguage";
import getLanguageList from "../actions/MasterDataApi/getLanguageList";
import getCategories from "../actions/MasterDataApi/getCategories";
import getIndustry from "../actions/MasterDataApi/getIndustry";
import getDepartments from "../actions/MasterDataApi/getDepartments";
import getJobRoleCategory from "../actions/MasterDataApi/getJobRoleCategory";
import getJobRole from "../actions/MasterDataApi/getJobRole";
import getKeySkills from "../actions/MasterDataApi/getKeySkills";
import getSoftwares from "../actions/MasterDataApi/getSoftwares";
import getBoards from "../actions/MasterDataApi/getBoards";
import getInstitutes from "../actions/MasterDataApi/getInstitutes";
import getCourses from "../actions/MasterDataApi/getCourses";
import getSpecialization from "../actions/MasterDataApi/getSpecialization";
import getPlatforms from "../actions/MasterDataApi/getPlatforms";
import getCorporateSize from "../actions/MasterDataApi/getCorporateSize";
import getCorporateStage from "../actions/MasterDataApi/getCorporateStage";
import getDifficultyLevel from "../actions/MasterDataApi/getDifficultyLevel";
import getSectors from "../actions/MasterDataApi/getSectors";
import getPhotoSlider from "../actions/MasterDataApi/getPhotoSlider";
import getExperienceRange from "../actions/MasterDataApi/getExperienceRange";
import getEmpTypes from "../actions/MasterDataApi/getEmpTypes";
import qpFetchFetch from "../actions/MasterDataApi/qpFetch";
import examlistQP from "../actions/MasterDataApi/examListQP";
import attemptedList from "../actions/MasterDataApi/attemptedList";
import getRandomMockExam from "../actions/MasterDataApi/getRandomMockExam";
import amsStatistics from "../actions/MasterDataApi/amsStatistics";
import hackthonStudentDashboardStatistics from "../actions/Hackthon/hackthonStudentDashboardStatistics";
import newHackathonList from "../actions/Hackthon/newHackathonList";
import enrolledHackathonList from "../actions/Hackthon/enrolledHackathonList";
import aymentPolicyDescription from "../actions/Hackthon/paymentPolicyDescription";
import applyPromo from "../actions/Hackthon/applyPromo";
import updatePayment from "../actions/Hackthon/updatePayment";
import fetchAllTransaction from "../actions/Hackthon/fetchAllTransaction";
import fetchRefundRequest from "../actions/Hackthon/fetchRefundRequest";
import vivaExamFetch from "../actions/Viva/vivaExamFetch";
import dashboardExamList from "../actions/MasterDataApi/dashboardExamList";
import disciptiveExamFetch from "../actions/DescriptiveCopy/disciptiveExamFetch";
import discriptiveExamSubmit from "../actions/DescriptiveCopy/discriptiveExamSubmit";
import examInitial from "../actions/Theory/examInitial";
import SubmitExam from "../actions/Theory/submitExam";
import randomImages from "../actions/Theory/randomImages";
import examsInitial from "../actions/Passcode/examsInitial";
import autoExamInitial from "../actions/Passcode/autoExamInitial";
import submitExams from "../actions/Passcode/submitExams";
import attemptedHackathonList from "../actions/Hackthon/attemptedHackathonList";
import leaderboard from "../actions/Hackthon/leaderboard";

function ApiTesting() {
  const apiTestingHandler = async () => {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    console.log("User Respone:", user);
    try {
      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        id: 2,
        id_batch: 8644,
        // exam_id: "8551",
        // student_id: "211086",
        // sub_user_id: "28",
        // user_id: 1,
        // req_by: "web",
        // shuffle_ques: "1",
        // shuffle_ans: 0,
        // total_question: 4,
        // total_time_taken: 3.46,
        // type: 1,
        // students: [{ student_id: 211037, attempted: 1 }],
      };
      console.log("Testing data:", data);
      await profilePercentage(data);
    } catch (error) {
      console.log("Error while testing api :: ", error);
    }
  };

  return (
    <div className="flex h-screen text-white text-3xl items-center justify-center bg-black">
      <button onClick={apiTestingHandler} className="bg-gray-900 h-40 w-60">
        Testing Page
      </button>
    </div>
  );
}

export default ApiTesting;
