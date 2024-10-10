import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginScreen from "./pages/LoginScreens/LoginScreen.jsx";
import ForgetUsername from "./components/LoginScreens/ForgetUsername.jsx";
import { RouterProvider } from "react-router-dom";
import Login from "./components/LoginScreens/Login.jsx";
import ForgetPassword from "./components/LoginScreens/ForgetPassword.jsx";
import LoginWithPasscodePage from "./pages/LoginScreens/LoginWithPasscodePage.jsx";
import EnterLoginPasscode from "./components/LoginScreens/EnterLoginPasscode.jsx";
import VerifyProfile from "./components/LoginScreens/VerifyProfile.jsx";
import UploadPhoto from "./components/LoginScreens/UploadPhoto.jsx";
import UploadIDPhoto from "./components/LoginScreens/UploadIDPhoto.jsx";
import OTPVerify from "./components/LoginScreens/OTPVerify.jsx";
import AadharVerify from "./components/LoginScreens/AadharVerify.jsx";
import Instruction from "./components/LoginScreens/Instruction.jsx";
import StudentDashboard from "./pages/LoginScreens/StudentDashboard.jsx";
import LoginWithOTP from "./components/LoginScreens/LoginWithOTP.jsx";
import SignUpPage from "./pages/LoginScreens/SignUpPage.jsx";
import SignUp from "./components/LoginScreens/SignUp.jsx";
import ForgetPasswordOTPVerify from "./components/LoginScreens/ForgetPasswordOTPVerify.jsx";
import ResetPassword from "./components/LoginScreens/ResetPassword.jsx";
import ApiTesting from "./components/ApiTesting.jsx";
import Question from "./pages/Exams/Question.jsx";
import UserProfile from "./components/Dashboard/UserProfile.jsx";
import PersonalProfile from "./components/Dashboard/PersonalProfile.jsx";
import ProfileUpdate from "./components/Dashboard/ProfileUpdate.jsx";
import PersonalUpdate from "./components/Dashboard/PersonalUpdate.jsx";
import ChangePassword from "./components/Dashboard/ChangePassword.jsx";
import EducationProfile from "./components/Dashboard/EducationProfile.jsx";
import Employment from "./components/Dashboard/Employment.jsx";
import Skills from "./components/Dashboard/Skills.jsx";
import Resume from "./components/Dashboard/Resume.jsx";
import CareerProfile from "./components/Dashboard/CareerProfile.jsx";
import ExamFeeDetailsPage from "./pages/Dashboard/ExamFeeDetailsPage.jsx";
import Exams from "./components/Dashboard/Exams.jsx";
import Sectors from "./components/Dashboard/Sectors.jsx";
import EditProfile from "./components/Dashboard/EditProfile.jsx";
import AddEducation from "./components/Dashboard/AddEducation.jsx";
import CompletedHackathon from "./components/Hackathon/CompletedHackathon.jsx";
import CorporateHackathonDashboard1 from "./components/Hackathon/CorporateHackathonDashboard1.jsx";
import CorporateHackathonDashboard2 from "./components/Hackathon/CorporateHackathonDashboard2.jsx";
import CorporateHackathonDashboard3 from "./components/Hackathon/CorporateHackathonDashboard3.jsx";
import CorporateSignUp from "./components/Hackathon/CorporateSignUp.jsx";
import DashboardCorporateProfile from "./components/Hackathon/DashboardCorporateProfile.jsx";
import NextHackathon from "./components/Hackathon/NextHackathon.jsx";
import PendingHackathon from "./components/Hackathon/PendingHackathon.jsx";
import { TbProgressBolt } from "react-icons/tb";
import Progress from "./components/Hackathon/ProgressBar.jsx";
import RejectedHackathon from "./components/Hackathon/RejectedHackathon.jsx";
import EditProfileUpdate from "./components/Dashboard/EditProfileUpdate.jsx";
import AddEmployment from "./components/Dashboard/AddEmployment.jsx";
import AddCareerProfile from "./components/Dashboard/AddCareerProfile.jsx";
import AddSkills from "./components/Dashboard/AddSkills.jsx";
import AddResume from "./components/Dashboard/AddResume.jsx";
import StudentExams from "./components/Dashboard/StudentExams.jsx";
import AttemptedExam from "./components/Dashboard/AttemptedExam.jsx";
import AudioPlayer from "./components/Exams/AudioPlayer.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamFeeDetails from "./components/Dashboard/ExamFeeDetails.jsx";
import Descriptive from "./pages/Exams/Descriptive.jsx";
import Viva from "./pages/Exams/Viva.jsx";
import FinalSubmit from "./pages/Exams/FinalSubmit.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/ui-testing" element={<enrolledHackathonList />}></Route>
      <Route path="/ui-testing2" element={<AddResume />}></Route>
      {/* <Route path="/ui-testing" element={<AddEmployment />}></Route> */}
      {/* <Route path="/edit-profile" element={<EditProfile />}></Route> */}
      <Route path="/add-Education" element={<AddEducation />}></Route>
      <Route path="/" element={<LoginScreen />}>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/login/forget-username"
          element={<ForgetUsername />}
        ></Route>
        <Route
          path="/login/forget-password"
          element={<ForgetPassword />}
        ></Route>
        <Route
          path="/login/forget-password/verify-otp"
          element={<ForgetPasswordOTPVerify />}
        ></Route>
        <Route
          path="/login/forget-password/reset-password"
          element={<ResetPassword />}
        ></Route>
      </Route>
      <Route path="/login-with-passcode/" element={<LoginWithPasscodePage />}>
        <Route
          path="/login-with-passcode/login-passcode"
          element={<EnterLoginPasscode />}
        ></Route>
        <Route
          path="/login-with-passcode/verify-profile"
          element={<VerifyProfile />}
        ></Route>
        <Route
          path="/login-with-passcode/upload-photo"
          element={<UploadPhoto />}
        ></Route>
        <Route
          path="/login-with-passcode/upload-id"
          element={<UploadIDPhoto />}
        ></Route>
        <Route
          path="/login-with-passcode/verify-otp"
          element={<OTPVerify />}
        ></Route>
        <Route
          path="/login-with-passcode/verify-aadhar"
          element={<AadharVerify />}
        ></Route>
      </Route>
      <Route path="/welcome" element={<Instruction />}></Route>
      <Route path="/descriptive" element={<Descriptive />} />
      <Route path="/viva" element={<Viva />} />
      <Route path="/final-submit" element={<FinalSubmit />} />
      <Route path="/exams" element={<Question />}>
        <Route path="/exams/audioPlayer" element={<AudioPlayer />}></Route>
        <Route path="/exams/descriptive" element={<Descriptive />}></Route>
      </Route>
      <Route path="/dashboard" element={<StudentDashboard />}>
        <Route path="/dashboard/exams" element={<Exams />}></Route>
        <Route
          path="/dashboard/hackathon/corporatehackathondashboard"
          element={<CorporateHackathonDashboard1 />}
        ></Route>
        <Route
          path="/dashboard/studentexams"
          element={<StudentExams />}
        ></Route>
        <Route
          path="/dashboard/hackathon/completedhackathon"
          element={<CompletedHackathon />}
        ></Route>
        <Route
          path="/dashboard/hackathon/corporatehackathondashboard1"
          element={<CorporateHackathonDashboard1 />}
        ></Route>
        <Route
          path="/dashboard/hackathon/corporatehackathondashboard2"
          element={<CorporateHackathonDashboard2 />}
        ></Route>
        <Route
          path="/dashboard/hackathon/corporatehackathondashboard3"
          element={<CorporateHackathonDashboard3 />}
        ></Route>
        <Route
          path="/dashboard/hackathon/corporatesignup"
          element={<CorporateSignUp />}
        ></Route>
        <Route
          path="/dashboard/hackathon/dashboardcorporateprofile"
          element={<DashboardCorporateProfile />}
        ></Route>
        <Route
          path="/dashboard/hackathon/nexthackathon"
          element={<NextHackathon />}
        ></Route>
        <Route
          path="/dashboard/hackathon/pendinghackathon"
          element={<PendingHackathon />}
        ></Route>
        <Route
          path="/dashboard/hackathon/progress"
          element={<Progress />}
        ></Route>
        <Route
          path="/dashboard/examfeedetails/:examId"
          element={<ExamFeeDetails />}
        ></Route>
        <Route
          path="/dashboard/hackathon/rejectedhackathon"
          element={<RejectedHackathon />}
        ></Route>
        <Route path="/dashboard/student-profile" element={<UserProfile />}>
          <Route
            path="/dashboard/student-profile/sectors"
            element={<Sectors />}
          ></Route>

          <Route
            path="/dashboard/student-profile/personal-details"
            element={<PersonalProfile />}
          >
            <Route
              path="/dashboard/student-profile/personal-details/personal-update"
              element={<PersonalUpdate />}
            ></Route>
          </Route>
          <Route
            path="/dashboard/student-profile/profile-update"
            element={<ProfileUpdate />}
          ></Route>
          <Route
            path="/dashboard/student-profile/education-profile"
            element={<EducationProfile />}
          ></Route>
          <Route
            path="/dashboard/student-profile/employment"
            element={<Employment />}
          ></Route>
          <Route
            path="/dashboard/student-profile/skills"
            element={<Skills />}
          ></Route>
          <Route
            path="/dashboard/student-profile/resume"
            element={<Resume />}
          ></Route>
          <Route
            path="/dashboard/student-profile/career-profile"
            element={<CareerProfile />}
          ></Route>
          <Route
            path="/dashboard/student-profile/change-password"
            element={<ChangePassword />}
          ></Route>
        </Route>
      </Route>
      <Route path="/login-with-otp" element={<LoginWithPasscodePage />}>
        <Route
          path="/login-with-otp/login-otp"
          element={<LoginWithOTP />}
        ></Route>
        <Route
          path="/login-with-otp/verify-otp"
          element={<OTPVerify />}
        ></Route>
      </Route>
      <Route path="/signup" element={<SignUpPage />}>
        <Route path="/signup/account" element={<SignUp />}></Route>
        <Route
          path="/signup/account/verify-otp"
          element={<ForgetPasswordOTPVerify />}
        ></Route>
      </Route>
      <Route path="/testing" element={<ApiTesting />}></Route>

      <Route path="/welcome" element={<Instruction />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
