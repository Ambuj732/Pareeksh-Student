import React, { useCallback, useRef } from "react";
import logo from "/logo.png";
import questionMark from "/questionMark.png";
import pareekshn_logo from "../../assets/LoginScreen/pareekshn_logo.png";
import logout from "/logout.png";
import reset from "/reset1.png";
import previous from "/previous.png";
import play from "/play.png";
import next from "/next.png";
import lock from "/lock.png";
import translate from "../../assets/LoginScreen/translate.png";
import angleDown from "../../assets/LoginScreen/angleDown.png";
import indicatorExam from "../../assets/LoginScreen/indicatorExam.png";
import questionIndicator from "../../assets/LoginScreen/questionIndicator.png";
import info from "../../assets/LoginScreen/Info.png";
import speak from "../../assets/LoginScreen/speak.png";
import livevideo from "../../assets/LoginScreen/livevideo.png";
import logoutUser from "../../actions/LoginScreens/logout";

import { useState, useEffect } from "react";
import TextOptions from "../../components/Exams/TextOptions";
import QuestionSection from "../../components/Exams/QuestionSection";
import { Link, Outlet, useNavigate } from "react-router-dom";
import getStudentProfile from "../../actions/Dashboard/getStudentProfile";
import getExam from "../../actions/LoginScreens/getExam";
import examsInitial from "../../actions/Passcode/examsInitial";
import getTheorySecondExamInitial from "../../actions/Passcode/getTheorySecondExamInitial";
import getPsychometricExamInitial from "../../actions/Passcode/getPsychometricExamInitial";
import autoExamInitial from "../../actions/Passcode/autoExamInitial.js";
import descriptiveExamInitial from "../../actions/Passcode/descriptiveExamInitial.js";
import submitByIndex from "../../actions/Passcode/submitByIndex";
import theorySecondSubmitByIndex from "../../actions/Passcode/theorySecondSubmitByIndex";
import psycSubmitByIndex from "../../actions/Passcode/psycSubmitByIndex";
import getTheoryQuestionByNo from "../../actions/Passcode/getTheoryQuestionByNo";
import getTheorySecondQuestionByIndex from "../../actions/Passcode/getTheorySecondQuestionByIndex";
import getPsycQuestionByIndex from "../../actions/Passcode/psycQuestionByIndex.js";
import getAutoQuestionByIndex from "../../actions/Passcode/getAutoQuestionByIndex.js";
import descriptiveQuestionByIndex from "../../actions/Passcode/descriptiveQuestionByIndex.js";

import getStudentLog from "../../actions/Passcode/getStudentLog";
import psycStudentLog from "../../actions/Passcode/psycStudentLog.js";
import theorySecondStudentLog from "../../actions/Passcode/theorySecondStudentLog";
// import freezeStatus from "../../actions/Passcode/freezeStatus";
import getSecondaryLanguage from "../../actions/Passcode/getSecondaryLanguage";
import resetOptions from "../../actions/Passcode/resetOptions";
import theorySecondClearAnsweredOption from "../../actions/Passcode/theorySecondClearAnsweredOption";
import psycClearAnsweredOption from "../../actions/Passcode/psycClearAnsweredOption.js";
import sendRandomImage from "../../actions/Passcode/sendRandomImage";
import theorySecondSaveRandomImage from "../../actions/Passcode/theorySecondSaveRandomImage";
import psycSendRandomImage from "../../actions/Passcode/psycSendRandomImage.js";
import Webcam from "react-webcam";
import startTimer from "../../utils/timer";
import googleTranslateApi from "../../actions/Passcode/googleTranslateApi";
import finalSubmit from "../../actions/Passcode/finalSubmit";
import theorySecondFinalSubmit from "../../actions/Passcode/theorySecondFinalSubmit";
import psycFinalSubmit from "../../actions/Passcode/psycFinalSubmit.js";
import { TOTAL_IMAGE_CAPTURE_COUNT } from "../../constants";
import Swal from "sweetalert2";
import textToSpeech from "../../utils/textToSpeech";
import { date } from "yup";
import { MdDelete } from "react-icons/md";

import multiObjectDetection from "../../actions/Passcode/multiObjectDetection";
import facesDetection from "../../actions/Passcode/facesDetection";
import moveDetection from "../../actions/Passcode/moveDetection";
import CodeEditor from "../../components/Exams/CodeEditor.jsx";
import MathPadPreview from "../../../public/mathpad/MathPadPreview.jsx";
import Canvas from "../../lib/canvas/Canvas.jsx";
import descriptiveUploadCanvasWeb from "../../actions/Passcode/descriptiveUploadCanvasWeb.js";
import descriptiveUploadAnswerText from "../../actions/Passcode/descriptiveUploadAnswerText.js";
import descriptiveUploadAttachmentWeb from "../../actions/Passcode/descriptiveUploadAttachmentWeb.js";
import descriptiveDeleteAttachment from "../../actions/Passcode/descriptiveDeleteAttachment.js";
import descriptiveFinalExamSubmit from "../../actions/Passcode/descriptiveFinalExamSubmit.js";
import vivaExamInitial from "../../actions/Passcode/vivaExamInitial.js";
import vivaQuestionByIndex from "../../actions/Passcode/vivaQuestionByIndex.js";
import vivaUploadAnswer from "../../actions/Passcode/vivaUploadAnswer.js";
import vivaExamSubmit from "../../actions/Passcode/vivaExamSubmit.js";
import Record from "../../components/Exams/Record.jsx";
import vivaAnswerClear from "../../actions/Passcode/vivaAnswerClear.js";
import createTimer from "../../utils/timer.js";
import InstructionPage from "../../components/Exams/InstructionPage.jsx";

function Viva() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [studentProfile, setStudentProfile] = useState({});
  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [originalQuestion, setOriginalQuestion] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examInitial, setExamInitial] = useState({});
  const questionsList = [1, 2, 3, 4];
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [exam, setExam] = useState({});
  const [examType, setExamType] = useState("");
  const [secondaryLanguage, setSecondaryLanguage] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [time, setTime] = useState({ minutes: "06", seconds: "00" });
  const [timerInstance, setTimerInstance] = useState(null);
  const [lockStatus, setLockStatus] = useState(0);
  const [primaryLang, setPrimaryLang] = useState("");
  const [fiveMinuteLeft, setFiveMinuteLeft] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [answered, setAnswered] = useState({});
  const [visited, setVisited] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [mathPadPreview, setMathPadPreview] = useState(false);
  const [selectedMode, setSelectedMode] = useState("editor");
  const [code, setCode] = useState("");
  const [canvasData, setCanvasData] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [answerAttachment, setAnswerAttachment] = useState(null);
  const [vivaAnswer, setVivaAnswer] = useState(null);
  const [answerType, setAnswerType] = useState("");
  const [attempted, setAttempted] = useState(new Array(1000).fill(false));
  const [isMandatory, setIsMandatory] = useState([false]);
  const [primaryLanguage, setPrimaryLanugage] = useState("");
  const [primaryLanguageCode, setPrimaryLanguageCode] = useState("");
  const [locked, setLocked] = useState(new Array(1000).fill(false));
  const [instructionPages, setInstructionPages] = useState(false);

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setAttachment(e.target.files[0]);
    }
  };

  // const iframeComp = document.getElementsByTagName("iframe");
  // console.log(iframeComp);
  const intervalRef = useRef(null);
  const sendImageIntervalRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    console.log("User :: ", user);
    const examDetails = JSON.parse(sessionStorage.getItem("pkshn_exam_set"));
    console.log(examDetails);
    setExam(examDetails);
    setUser(user);
    let examType;
    if (examDetails?.theory2_login == 1 && examDetails?.auto == 0) {
      console.log("hi");
      examType = 5;
    } else if (examDetails?.theory2_login == 1 && examDetails?.auto == 1) {
      console.log("hi");
      examType = 4;
    } else {
      console.log("hi");
      examType = examDetails?.module;
    }
    setExamType(examType);
  }, []);

  useEffect(() => {
    // getStudentData();
    vivaExamInitialHandler();
    getSecondaryLanguageHandler();
  }, [user, examType]);

  // timer start yanha se hoga
  useEffect(() => {
    console.log("Initializing timer...");
    // setTimerInstance(time);
    const timer = createTimer(timerInstance, setTime);
    console.log(timer);
    timer.start();

    return () => {
      console.log("Cleaning up timer...");
      timer.pause();
    };
  }, [timerInstance]);

  useEffect(() => {
    if (parseInt(time.minutes) < 5) {
      setFiveMinuteLeft(true);
    }
  }, [timerInstance]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        Swal.fire({
          title: "Warning!",
          text: "You cannot switch your window during an assessment. If you do few more times, your exam will be submitted automatically.",
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    console.log("Captured image:", imageSrc);
    return imageSrc;
  };

  useEffect(() => {
    setScreenshot(imageSrc);
  }, [imageSrc]);

  const pushToAnswers = (data) => {
    const ans = [...answers];
    const isDuplicate = ans.some((answer) => answer?.index === data?.index);

    if (!isDuplicate) {
      ans.push(data);
      setAnswers(ans);
      console.log("Added:", data);
    } else {
      console.log("Duplicate not added:", data);
    }
    console.log(ans);
  };

  useEffect(() => {
    if (user && exam && !intervalRef.current) {
      intervalRef.current = setInterval(freezeStatusHandler, 12000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user, exam]);

  useEffect(() => {
    if (user && exam && !sendImageIntervalRef.current) {
      sendImageIntervalRef.current = setInterval(sendRandomImageHandler, 60000);
    }

    return () => {
      if (sendImageIntervalRef.current) {
        clearInterval(sendImageIntervalRef.current);
        sendImageIntervalRef.current = null;
      }
    };
  }, [user, exam]);

  useEffect(() => {
    const temp = new Array(1000).fill(false);
    Object.keys(submitted).forEach((key) => {
      if (submitted[key] == true) {
        temp[Number(key) - 1] = true;
      }
    });
    setLocked(temp);
  }, [submitted]);

  const popFromAnswers = (question_id) => {
    console.log(question_id);
    let ans = [...answers];
    console.log(ans);
    ans = ans?.filter((answer) => answer?.question_id != question_id);
    setAnswers(ans);
  };

  const sendRandomImageHandler = async () => {
    try {
      const imageSrc = capture();
      console.log(imageSrc);
      console.log(examInitial);
      const data = {
        file: imageSrc,
        exam_id: exam?.exam_id,
        student_id: user?.id,
        sub_user_id: user?.subuserid,
        user_id: user?.userid,
        usercode: user?.usercode,
        req_by: "web",
      };
      console.log(data);
      const formData = new FormData();
      formData.append("file", data?.file);
      formData.append("exam_id", data?.exam_id);
      formData.append("student_id", data?.student_id);
      formData.append("sub_user_id", data?.sub_user_id);
      formData.append("user_id", data?.user_id);
      formData.append("usercode", data?.usercode);
      formData.append("req_by", data?.req_by);

      console.log(data);
      const response = await sendRandomImage(formData);
      console.log(response);

      const imageUrl = response?.data?.pic;
      console.log(imageUrl);

      if (exam?.object_found) {
        const response = await multiObjectDetectionHandler(imageUrl);
        console.log();
        if (response?.data?.code === 1000) {
          Swal.fire(response?.data?.status);
        }
      }
      if (exam?.multi_face) {
        const response = await facesDetectionHandler(imageUrl);
        if (response?.data?.code === 1000) {
          Swal.fire(response?.data?.status);
        }
      }
      if (exam?.candidate_match) {
        const response = await moveDetectionHandler(imageUrl);
        if (response?.data?.code === 1000) {
          Swal.fire(response?.data?.status);
        }
      }
      return response;
    } catch (error) {
      console.log("Error while sending random image :: ", error);
    }
  };

  const getStudentData = async () => {
    try {
      // getExamHandler(user);
      const id_self_student = localStorage.getItem("id_self_student");
      console.log(id_self_student);
      const data = {
        usercode: user.usercode,
        id_self_student: id_self_student,
      };
      console.log(data);
      const response = await getStudentProfile(data);
      console.log("Profile Percentage response:", response);
      if (response?.data?.code === 1000)
        setStudentProfile(response?.data?.profile);
    } catch (error) {
      console.log("Error while getting data :: ", error);
      // setErrors([error.message]);
    }
  };

  // google translate api
  const googleTranslateApiHandler = async (selectedLanguage) => {
    try {
      console.log(selectedLanguage);
      const originalQuestionTemp = { ...currentQuestion };
      const options = [originalQuestionTemp?.question];
      const data = {
        allOptions: JSON.stringify(options),
        primary_lang_code: primaryLang,
        secondary_lang_code: selectedLanguage,
      };
      console.log(data);
      const response = await googleTranslateApi(data);
      console.log(response?.data?.translations[0]?.translatedText);
      let translatedText = response?.data?.translations?.[0]?.translatedText;
      translatedText = translatedText.replace(/[\[\]\"]+/g, "");
      console.log("Cleaned Translated Text: ", translatedText);

      const question = translatedText.split(",");
      console.log(question);

      // Assuming currentQuestion and setCurrentQuestion are state variables
      setCurrentQuestion((prev) => ({
        ...prev,
        question: question[0],
        options: [],
      }));

      setPrimaryLang(selectedLanguage);

      console.log(currentQuestion);
    } catch (error) {
      console.log("Error while google translating content :: ", error);
    }
  };

  // const freezeStatusHandler = async () => {
  // 	try {
  // 		const data = {
  // 			student_id: user?.id,
  // 			usercode: user?.usercode,
  // 			exam_id: exam?.exam_id,
  // 		};
  // 		const response = await freezeStatus(data);
  // 		console.log(response);
  // 	} catch (error) {
  // 		console.log("Error while getting freeze status :: ", error);
  // 	}
  // };

  // freeze Status Handler
  const freezeStatusHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      const data = {
        student_id: user?.id,
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
      };
      const response = await freezeStatus(data);
      console.log(response);
      if (response?.data?.code === 1000 && response?.data?.freeze == 1) {
        // TODO: Add Submit Functions here as well
      }
    } catch (error) {
      console.log("Error while getting freeze status :: ", error);
    }
  };

  // secondary language handler
  const getSecondaryLanguageHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log(user);
      const data = {
        exam_type: examType,
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
      };
      console.log(data);
      const response = await getSecondaryLanguage(data);
      console.log(response);
      setPrimaryLanugage(response?.data?.primary_lang_name);
      setPrimaryLanguageCode(response?.data?.primary_lang_code);
      setSecondaryLanguage(response?.data?.languages);
      console.log(response?.data?.languages);
    } catch (error) {
      console.log("Error while getting secondary langauge :: ", error);
    }
  };

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    googleTranslateApiHandler(event.target.value);
    console.log(selectedLanguage);
    console.log(event.target.value);
  };

  const handleLockStatusChange = () => {
    if (!selectedAnswer && !lockStatus) {
      Swal.fire("No Option is Selected!");
      return;
    }

    if (!lockStatus) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revisit this question later, do you want to continue?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Lock it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Locked!",
            text: "Your answer is locked.",
            icon: "success",
          });
          setLockStatus(true);
        }
      });
    }
  };

  const resetOptionsHandler = async () => {
    try {
      const data = {
        student_id: user?.id,
        exam_id: exam?.exam_id,
        usercode: user?.usercode,
        question_id: currentQuestion?.question_id,
      };
      console.log(data);
      if (!lockStatus) {
        const response = await resetOptions(data);
        console.log(response);
        if (response?.data?.code === 1000) {
          popFromAnswers(currentQuestion?.question_id);
        }
        setSelectedAnswer("");
      }
    } catch (error) {
      console.log("Error while resetting options :: ", error);
    }
  };

  const theorySecondClearAnsweredOptionHandler = async () => {
    try {
      const data = {
        student_id: user?.id,
        exam_id: exam?.exam_id,
        usercode: user?.usercode,
        question_id: currentQuestion?.question_id,
      };
      console.log(data);
      if (!lockStatus) {
        const response = await theorySecondClearAnsweredOption(data);
        console.log(response);
        if (response?.data?.code === 1000) {
          popFromAnswers(currentQuestion?.question_id);
        }
        setSelectedAnswer("");
      }
    } catch (error) {
      console.log("Error while resetting theory second options :: ", error);
    }
  };

  const psycClearAnsweredOptionHandler = async () => {
    try {
      const data = {
        student_id: user?.id,
        exam_id: exam?.exam_id,
        usercode: user?.usercode,
        question_id: currentQuestion?.question_id,
      };
      console.log(data);
      if (!lockStatus) {
        const response = await psycClearAnsweredOption(data);
        console.log(response);
        if (response?.data?.code === 1000) {
          popFromAnswers(currentQuestion?.question_id);
        }
        setSelectedAnswer("");
      }
    } catch (error) {
      console.log("Error while resetting theory second options :: ", error);
    }
  };

  const finalSubmitHandler = async () => {
    try {
      const student = [
        {
          student_id: user?.id,
          answers: answers,
          attempted: answers?.length,
        },
      ];
      console.log(examInitial);
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        students: JSON.stringify(student),
        type: exam?.module,
        total_time_taken: "5:48",
        mock_exam: 1,
        total_question: examInitial?.totalq,
      };
      console.log(data);
      const response = await finalSubmit(data);
      console.log(response);
    } catch (error) {
      console.log("Error while final submit :: ", error);
    }
  };

  const theorySecondFinalSubmitHandler = async () => {
    try {
      const student = [
        {
          student_id: user?.id,
          answers: answers,
          attempted: answers?.length,
        },
      ];
      console.log(examInitial);
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        students: JSON.stringify(student),
        type: exam?.module,
        total_time_taken: "5:48",
        mock_exam: 1,
        total_question: examInitial?.totalq,
      };
      console.log(data);
      const response = await theorySecondFinalSubmit(data);
      console.log(response);
    } catch (error) {
      console.log("Error while final submit :: ", error);
    }
  };

  const psycFinalSubmitHandler = async () => {
    try {
      const student = [
        {
          student_id: user?.id,
          answers: answers,
          attempted: answers?.length,
        },
      ];
      console.log(examInitial);
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        students: JSON.stringify(student),
        type: exam?.module,
        total_time_taken: "5:48",
        mock_exam: 1,
        total_question: examInitial?.totalq,
      };
      console.log(data);
      const response = await psycFinalSubmit(data);
      console.log(response);
    } catch (error) {
      console.log("Error while final submit :: ", error);
    }
  };

  const captureImageRandomlyHandler = async () => {
    await sendRandomImageHandler();
    let totalImageCaptureRequired = TOTAL_IMAGE_CAPTURE_COUNT;
    const examDuration = exam?.duration;
    const totalTimeInSeconds = examDuration * 60;
    let totalImageCaptured = 0;
    let intervalId = null;
    let randomTimeouts = [];
    const captureRemainingImage = async () => {
      const randomDelay = Math.random() * 60000;
      const timeoutId = setTimeout(async () => {
        const response = await sendRandomImageHandler(examInitial);
        console.log(response);
        if (response?.data?.code == 1000) totalImageCaptured++;
        console.log(totalImageCaptured);
        if (totalImageCaptured >= totalImageCaptureRequired) {
          clearInterval(intervalId);
          randomTimeouts.forEach(clearTimeout);
        }
      }, randomDelay);
      randomTimeouts.push(timeoutId);
    };
    const captureImageEveryMinute = async () => {
      const response = await sendRandomImageHandler(examInitial);
      console.log(response);
      if (response?.data?.code == 1000) totalImageCaptured++;
      console.log(totalImageCaptured);
      if (totalImageCaptured === 5) {
        clearInterval(intervalId);
        const currentInterval =
          ((totalTimeInSeconds - 300) / (totalImageCaptureRequired - 5)) * 1000;
        intervalId = setInterval(captureRemainingImage, currentInterval);
      }
    };
    intervalId = setInterval(captureImageEveryMinute, 6000);
    console.log(examDuration);
    const startTime = new Date();
    console.log(startTime);
    // Cleanup function to clear intervals and timeouts
    return () => {
      clearInterval(intervalId);
      randomTimeouts.forEach(clearTimeout);
    };
  };

  const multiObjectDetectionHandler = async (imageUrl) => {
    try {
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log(user);
      console.log(imageUrl);
      const data = {
        exam_id: Number(examInitial?.exam_id),
        student_id: user?.id,
        usercode: user?.usercode,
        randomphoto: imageUrl,
      };
      console.log(data);
      const response = await multiObjectDetection(data);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while multi object detection :: ", error);
    }
  };

  const facesDetectionHandler = async (imageUrl) => {
    try {
      const data = {
        exam_id: examInitial?.exam_id,
        student_id: user?.id,
        usercode: user?.usercode,
        randomphoto: imageUrl,
      };
      const response = await facesDetection(data);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while faces detection :: ", error);
    }
  };

  const moveDetectionHandler = async (imageUrl) => {
    try {
      const data = {
        exam_id: examInitial?.exam_id,
        student_id: user?.id,
        usercode: user?.usercode,
        randomphoto: imageUrl,
      };
      const response = await moveDetection(data);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while move detection :: ", error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const submitAndlogoutHandler = async () => {
    try {
      if (examInitial?.totalq - attempted) {
        Swal.fire({
          text: "This is a mandatory exam. You have to attempt all questions. Please press back button to go back and submit all questions.",
          icon: "warning",
        });
        return;
      }
      navigate("/final-submit");
    } catch (error) {
      console.log("Error while logging out user :: ", error);
    }
  };

  // setInterval(freezeStatusHandler, 120000);

  const enableTextToSpeech = () => {
    console.log(currentQuestion);
    const originalQuestionTemp = { ...currentQuestion };
    const question = originalQuestionTemp?.question;
    const options = [];
    textToSpeech(question, options, [], "hi-IN");
  };

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const descriptiveUploadAnswerTextHandler = async () => {
    try {
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        student_id: user?.id,
        qb_index: currentQuestion?.index,
        question_id: currentQuestion?.question_id,
        answer: !exam?.editor_type ? "Math Pad" : code,
        time_taken: 34,
        time: 543,
      };
      console.log(data);
      const response = await descriptiveUploadAnswerText(data);
      console.log(response);
      if (response?.data?.code == 1000) {
        setCode("");
        setCanvasData(null);
      }
    } catch (error) {
      console.log("Error while uploading answer text :: ", error);
    }
  };

  const getAttachmentType = (fileName) => {
    const extension = fileName?.split(".")?.pop()?.toLowerCase();
    console.log(extension);
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return 1; // Image
      case "pdf":
        return 2; // PDF
      case "doc":
      case "docx":
        return 3; // Document
      default:
        return 0; // Unknown
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

  // initial question yanhi se milega
  const vivaExamInitialHandler = async () => {
    try {
      const data = {
        exam_id: exam?.exam_id,
        student_id: user?.id,
        usercode: user?.usercode,
      };
      console.log(data);
      const response = await vivaExamInitial(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        const answerResponse = response?.data?.exams?.res;
        console.log(response?.data?.exams?.res);
        answerResponse?.map((res) => {
          console.log(res);
          if (res?.lock) {
            submitted[res?.index] = true;
          } else if (res?.answer) {
            answered[res?.index] = true;
            attempted[res?.index] = true;
          } else {
            visited[res?.index] = true;
          }
        });
        console.log(answerResponse);
        console.log(response?.data?.exams);
        startTimer(exam?.duration, setTime);
        // setTime(exam?.duration);
        setTimerInstance(exam?.duration);
        setExamInitial(response?.data?.exams);
        setTotalQuestion(response?.data?.exams?.totalq);
        console.log(response?.data?.exams?.question);
        setCurrentQuestion(response?.data?.exams?.question);
        setOriginalQuestion(response?.data?.exams?.question);
        setPrimaryLang(response?.data?.exams?.question?.lang);
        const answerType = response?.data?.exams?.question?.answer?.media_type;
        const answer = response?.data?.exams?.question?.answer?.answer_media;
        console.log(answer);
        setVivaAnswer(answer);
        setAnswerType(answerType);
        // console.log(response?.data?.exams?.question?.options);
        // const options = response?.data?.exams?.question?.options;
        // console.log(options);
        // let selected;
        // if (exam?.mso) {
        // 	selected = "";
        // 	let selectedArray = [];
        // 	options?.map((option) => {
        // 		console.log(option?.select_option);
        // 		if (option?.select_option) {
        // 			selectedArray?.push(option?.select_option);
        // 		}
        // 	});
        // 	selected = selectedArray?.join(",");
        // 	console.log(selected);
        // } else {
        // 	selected = 0;
        // 	options?.map((option) => {
        // 		console.log(option?.select_option);
        // 		if (option?.select_option) {
        // 			selected = option?.select_option;
        // 		}
        // 	});
        // }
        // console.log(selected);
        // setSelectedAnswer(selected);

        // const lock =
        // 	options[0]?.lock_status ||
        // 	options[1]?.lock_status ||
        // 	options[2]?.lock_status ||
        // 	options[3]?.lock_status;
        // console.log(lock);
        // setLockStatus(lock);
      }
    } catch (error) {
      console.log("Error while getting initial exam :: ");
    }
  };

  // Question nowise mielga
  const vivaQuestionByIndexHandler = async (value, idx) => {
    try {
      const ind = idx ? idx : Number(currentQuestion?.index) + value;
      console.log(ind);
      const data = {
        index: ind,
        req_by: "web",
        exam_id: exam?.exam_id,
        student_id: user?.id,
        usercode: user?.usercode,
      };
      console.log(data);
      if (!idx && !vivaAnswer) {
        Swal.fire({
          text: "Please record your response before submit to next question!!",
          icon: "warning",
        });
        return;
      }
      const response = await vivaQuestionByIndex(data);
      setSelectedAnswer("");
      console.log(response);
      if (response?.data?.code === 1000) {
        setVivaAnswer("");
        setAnswerType("");
        const question = response?.data?.question;
        console.log(question);
        // mandatory[question?.index] ;
        setCurrentQuestion(response?.data?.question);
        setOriginalQuestion(response?.data?.question);
        console.log(response?.data?.question);
        const answerType = response?.data?.question?.answer?.media_type;
        const answer = response?.data?.question?.answer?.answer_media;
        console.log(answer);
        setVivaAnswer(answer);
        setAnswerType(answerType);
        // const options = response?.data?.question?.options;
        // console.log(options);
        // let selected;
        // if (exam?.mso) {
        // 	selected = "";
        // 	let selectedArray = [];
        // 	options?.map((option) => {
        // 		console.log(option?.select_option);
        // 		if (option?.select_option) {
        // 			selectedArray?.push(option?.select_option);
        // 		}
        // 	});
        // 	selected = selectedArray?.join(",");
        // 	console.log(selected);
        // } else {
        // 	selected = 0;
        // 	options?.map((option) => {
        // 		console.log(option?.select_option);
        // 		if (option?.select_option) {
        // 			selected = option?.select_option;
        // 		}
        // 	});
        // }
        // console.log(selected);
        // setSelectedAnswer(selected);
        // const lock =
        // 	options[0]?.lock_status ||
        // 	options[1]?.lock_status ||
        // 	options[2]?.lock_status ||
        // 	options[3]?.lock_status;
        // console.log(lock);
        // setLockStatus(lock);
      }
    } catch (error) {
      console.log("Error while getting theory question by index :: ", error);
    }
  };

  // upload answer viva
  const vivaUploadAnswerHandler = async () => {
    try {
      console.log(user);
      console.log(vivaAnswer);
      const data = {
        file: vivaAnswer,
        sub_user_id: user?.subuserid,
        user_id: user?.userid,
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        student_id: user?.id,
        index: currentQuestion?.index,
        marks: "",
        remarks: "",
        req_by: "web",
        answer_type: answerType,
        question_id: currentQuestion?.question_id,
      };
      console.log(data);
      let response = null;
      if (data?.file && !data?.file?.includes("http")) {
        response = await vivaUploadAnswer(data);
        console.log(response);
        if (response?.data?.code === 1000) {
          if (vivaAnswer && !lockStatus) {
            console.log(vivaAnswer);
            answered[data?.index] = true;
            const attempted = [...attempted];
            attempted[currentQuestion?.index] = true;
            setAttempted[attempted];
            visited[data?.index] = false;
          } else {
            submitted[data?.index] = true;
          }
          const submittedAnswer = {
            index: data?.index,
            answer_id: data?.answer_id,
            question_id: data?.question_id,
            time_taken: data?.time_taken,
          };
          pushToAnswers(submittedAnswer);
        }
      } else {
        console.log("here");
        visited[data?.index] = true;
        answered[data?.index] = false;
        submitted[data?.index] = false;
      }
      // if (currentQuestion?.index == exam?.totalq) {
      // 	console.log(currentQuestion?.index);
      // 	console.log(examInitial?.totalq);
      // }
      // navigate("/final-submit");
    } catch (error) {
      console.log("Error while viva answer by index :: ", error);
    }
  };

  // Answer clear api
  const vivaAnswerClearHandler = async () => {
    try {
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        student_id: user?.id,
        question_id: currentQuestion?.question_id,
      };
      const response = await vivaAnswerClear(data);
      console.log(response);
      if (response?.data?.code === 1000) {
        setVivaAnswer("");
        setAnswerType("");
        Swal.fire("Answer Media Deleted!");
      }
    } catch (error) {
      console.log("Error while clearing answer :: ", error);
    }
  };

  //final exam submit handler
  const vivaFinalExamSubmitHandler = async () => {
    try {
      const data = {
        usercode: user?.usercode,
        exam_id: exam?.exam_id,
        student_id: user?.id,
      };
      const response = await vivaExamSubmit(data);
      console.log(response);
    } catch (error) {
      console.log("Error while submitting viva exam :: ", error);
    }
  };

  // navigation final handler
  const navigateToFinalSubmitPage = () => {
    console.log(Number(currentQuestion?.index) + 1);
    console.log(examInitial?.totalq + 1);
    if (Number(currentQuestion?.index) + 1 == examInitial?.totalq + 1) {
      console.log(Number(currentQuestion?.index));
      console.log(examInitial?.totalq);
      localStorage.setItem("ps_attempted", JSON.stringify(attempted));
      localStorage.setItem("ps_totalq", JSON.stringify(examInitial?.totalq));
      navigate("/final-submit");
    }
  };

  const vivaResetAnswerHandler = () => {
    setVivaAnswer("");
    setAnswerType("");
  };
  const profile_Data = JSON.parse(localStorage.getItem("pkshn_profileData"));

  const instructionPage = () => {
    setInstructionPages(true);
  };

  const closeModal = () => {
    setInstructionPages(false);
  };
  return (
    <>
      <div className="min-h-screen font-custom">
        {/* Header */}
        <div className="h-20 bg-[#305187] px-8 flex items-center justify-between">
          <img src={pareekshn_logo} alt="" className="h-4/5 my-auto" />

          <div className="flex gap-6">
            <div className="flex items-center justify-around  gap-2 bg-[#FEFEFF1A] rounded-full h-14 w-[200px] px-2">
              <img
                src={profile_Data?.pic}
                alt=""
                className=" object-contain rounded-full w-16 h-11 "
              />
              <div className="flex flex-col font-medium text-white">
                <span className="w-[150px]">{profile_Data?.name}</span>
              </div>
            </div>
            <div className="flex gap-3 h-14">
              <img
                src={logout}
                alt=""
                onClick={submitAndlogoutHandler}
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
        {/* Main */}
        <div className="flex flex-col">
          <div className="flex justify-between p-4 px-8 items-center">
            <span className="text-2xl font-medium text-[#1C4481]">
              {examInitial?.type}
            </span>
            <div className="flex gap-4 items-center">
              <div
                className="flex flex-col bg-[#DDEAFF] px-4 rounded-md py-1 cursor-pointer"
                onClick={() => googleTranslateApiHandler(primaryLanguageCode)}
              >
                <span className="font-medium text-sm">Default Language</span>
                <span className="font-bold">{primaryLanguage}</span>
              </div>
              <div className="flex items-center gap-5">
                <div className="flex flex-col text-sm font-medium">
                  <span>You can translate question</span>
                  <span>into other languages</span>
                </div>
                <img src={translate} alt="" className="h-5 w-3" />
              </div>
              {secondaryLanguage && (
                <div className=" text-blue-700 h-10 w-fit flex items-center justify-between  rounded-md element-outline-none outline-none">
                  <select
                    value={selectedLanguage}
                    onChange={handleChange}
                    className="rounded-md border-[2px] border-gray-500 w-full appearance-none focus:border-gray-500 focus:ring-0"
                  >
                    <option>Select</option>
                    {secondaryLanguage?.map((lang) => (
                      <option key={lang?.lang_code} value={lang?.lang_code}>
                        {lang?.lang_name}
                      </option>
                    ))}
                  </select>
                  {/* <img src={angleDown} alt="" /> */}
                </div>
              )}
            </div>
          </div>

          {/* {question Number part} */}
          <div className="bg-white h-20 border mt-4 rounded-l-2xl flex  px-12 justify-between gap-10">
            <div className="flex  items-center gap-10">
              <div className="flex items-center gap-4 w-[700px]">
                <img
                  src={questionIndicator}
                  alt=""
                  className="h-5 cursor-pointer"
                  onClick={scrollLeft}
                />
                <div
                  className="flex gap-5 w-full overflow-x-scroll no-scrollbar items-center"
                  ref={scrollContainerRef}
                >
                  {Array.from({ length: totalQuestion }, (_, index) => {
                    let className = "bg-[#808080]";
                    if (Number(currentQuestion?.index) == index + 1) {
                      className = "border-[3px] border-[#14540E] bg-white";
                    } else if (answered[index + 1] == true) {
                      className = "text-white bg-[#125302]";
                    } else if (submitted[index + 1] == true) {
                      className = "text-white bg-[#FF7272]";
                    } else if (visited[index + 1] == true) {
                      className = "bg-[#ce03dc] text-white";
                    }
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          // if (exam?.theory2_login) {
                          // 	getTheorySecondQuestionByIndexHandler(
                          // 		0,
                          // 		index + 1
                          // 	);
                          // 	theorySecondSubmitByIndexHandler();
                          // } else if (
                          // 	exam?.entered_psyc
                          // ) {
                          // 	getPsycQuestionByIndexHandler(
                          // 		0,
                          // 		index + 1
                          // 	);
                          // 	psycSubmitByIndexHandler();
                          // } else if (
                          // 	exam?.descriptive
                          // ) {
                          // 	descriptiveQuestionByIndexHandler(
                          // 		0,
                          // 		index + 1
                          // 	);
                          // 	descriptiveSubmitByIndexHandler();
                          // } else {
                          // 	submitByIndexHandler();
                          // 	getTheoryQuestionByNoHandler(
                          // 		0,
                          // 		index + 1
                          // 	);
                          // }
                          vivaQuestionByIndexHandler(0, index + 1);
                          vivaUploadAnswerHandler();
                        }}
                        className={`bg-[#A6E097] min-h-12 min-w-12 flex items-center justify-center rounded-lg font-semibold text-lg text-black cursor-pointer ${className}`}
                      >
                        <span>{index + 1}</span>
                      </div>
                    );
                  })}
                </div>
                <img
                  src={questionIndicator}
                  alt=""
                  className="scale-x-[-1] h-5 cursor-pointer"
                  onClick={scrollRight}
                />
              </div>
              <span className="font-medium text-xl">
                Time Remaining -{" "}
                <span
                  className={`font-semibold text-2xl ${
                    fiveMinuteLeft ? "text-red-600 blink" : ""
                  }`}
                >
                  {time.minutes}:{time.seconds}
                </span>
              </span>
            </div>
            <div className="flex gap-3 items-center text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-[#2B8B14] rounded-full"></div>
                <span className="font-medium text-slate-600">Answered</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-[#FF7272] rounded-full"></div>
                <span className="font-medium text-slate-600">Submitted</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-[#ce03dc] rounded-full"></div>
                <span className="font-medium text-slate-600">Visited</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-[#808080] rounded-full"></div>
                <span className="font-medium text-slate-600">Not Visited</span>
              </div>
            </div>
          </div>

          {/* {question part start} */}
          <div className="flex">
            <div className="w-1/2 ml-8 px-2 mt-1 border-r flex flex-col gap-4">
              <div className="flex mt-6 justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-[#1C4481]">
                    {examInitial?.exam_name}
                  </span>
                  <span className="font-semibold text-[#1C4481]">
                    {Number(currentQuestion?.index)}/{examInitial?.totalq}-
                    Level {currentQuestion?.diff_level}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 border-[#14540E] border w-28 flex items-center justify-center rounded-full text-sm">
                    <span className="font-semibold text-[#5F5F5F]">
                      Max Marks {examInitial?.max_marks}
                    </span>
                  </div>
                  <div className="bg-[#FAFF0D] px-3 rounded-full h-9 flex items-center justify-center font-medium gap-1 text-sm">
                    <img src={info} alt="" className="h-4" />
                    {currentQuestion?.question_inst && (
                      <span>{currentQuestion?.question_inst}</span>
                    )}
                  </div>
                  <img
                    src={speak}
                    alt="text-to-speech"
                    className="h-7 cursor-pointer"
                    onClick={enableTextToSpeech}
                  />
                </div>
              </div>
              <div className="border-t-2 border-[#c2c2c2]"></div>
              {currentQuestion && (
                <QuestionSection question={currentQuestion} />
              )}
              <div className="border-t border-[#c2c2c2]"></div>
              <div className="w-full h-32 flex items-center justify-between px-8">
                <div className="flex flex-col items-center gap-2">
                  <Webcam
                    audio={false}
                    // minScreenshotHeight={}
                    minScreenshotWidth={"640"}
                    screenshotQuality={1}
                    disablePictureInPicture={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="h-20 rounded-md"
                  />

                  <span className="font-medium text-[#444444]">Live Video</span>
                </div>
                <div className="flex gap-4 items-center justify-between ">
                  <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => {
                      vivaResetAnswerHandler();
                    }}
                  >
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={reset} alt="" className="h-8" />
                    </div>
                    <span>Reset</span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => {
                      // if (exam?.theory2_login) {
                      // 	getTheorySecondQuestionByIndexHandler(
                      // 		-1
                      // 	);
                      // 	theorySecondSubmitByIndexHandler();
                      // } else if (exam?.entered_psyc) {
                      // 	psycSubmitByIndexHandler();
                      // 	getPsycQuestionByIndexHandler(
                      // 		-1
                      // 	);
                      // } else if (exam?.descriptive) {
                      // 	descriptiveQuestionByIndexHandler(
                      // 		-1
                      // 	);
                      // 	descriptiveSubmitByIndexHandler();
                      // } else {
                      // 	submitByIndexHandler();
                      // 	getTheoryQuestionByNoHandler(
                      // 		-1
                      // 	);
                      // }
                      vivaQuestionByIndexHandler(-1);
                      vivaUploadAnswerHandler();
                    }}
                  >
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={previous} alt="" className="h-6" />
                    </div>
                    <span>Previous</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={play} alt="" className="h-6" />
                    </div>
                    <span>Play</span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={() => {
                      // if (exam?.theory2_login) {
                      // 	getTheorySecondQuestionByIndexHandler(
                      // 		1
                      // 	);
                      // 	theorySecondSubmitByIndexHandler();
                      // } else if (exam?.entered_psyc) {
                      // 	getPsycQuestionByIndexHandler(
                      // 		1
                      // 	);
                      // 	psycSubmitByIndexHandler();
                      // } else if (exam?.descriptive) {
                      // 	descriptiveQuestionByIndexHandler(
                      // 		1
                      // 	);
                      // 	descriptiveSubmitByIndexHandler();
                      // } else {
                      // 	submitByIndexHandler();
                      // 	getTheoryQuestionByNoHandler(1);
                      // }
                      vivaQuestionByIndexHandler(1);
                      vivaUploadAnswerHandler();
                      navigateToFinalSubmitPage();
                    }}
                  >
                    <div className="border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center">
                      <img src={next} alt="" className="h-6" />
                    </div>
                    <span>Next</span>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2  cursor-not-allowed opacity-50"
                    // onClick={handleLockStatusChange}
                  >
                    <div
                      className={`border-2 flex-col border-[#1C4481] rounded-full h-11 w-11 flex items-center justify-center`}
                    >
                      <img src={lock} alt="" className="h-6" />
                    </div>
                    <span>Lock</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2 mt-1">
              <div className="bg-[#F3F7FF] mx-4 rounded-xl p-6 flex flex-col gap-6">
                <div className="flex justify-between h-12">
                  <span className="font-semibold">Ans.</span>
                  {vivaAnswer?.includes("http") && (
                    <button
                      onClick={vivaAnswerClearHandler}
                      className="bg-[#1C4481] p-1 px-3 h-9 rounded-md font-medium text-white"
                    >
                      Delete Answer
                    </button>
                  )}
                </div>
                <Record
                  setVivaAnswer={setVivaAnswer}
                  setAnswerType={setAnswerType}
                  vivaAnswer={vivaAnswer}
                  answerType={answerType}
                />
              </div>
            </div>
          </div>
        </div>
        {instructionPages && <InstructionPage closeModal={closeModal} />}
      </div>
      <Outlet />
    </>
  );
}

export default Viva;
