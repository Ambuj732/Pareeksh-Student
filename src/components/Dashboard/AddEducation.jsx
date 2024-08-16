import React, { useState, useEffect } from "react";
import close from "../../assets/Dashboard/close.png";
import { IoPerson } from "react-icons/io5";
import { useForm } from "react-hook-form";
import getHighQualList from "../../actions/LoginScreens/getHighQualList";
import message from "../../assets/LoginScreen/message.png";
import addEducation from "../../actions/Dashboard/addEducation";
import { useDispatch, useSelector } from "react-redux";
import getCourses from "../../actions/MasterDataApi/getCourses";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import getInstitutes from "../../actions/MasterDataApi/getInstitutes";
import getBoards from "../../actions/MasterDataApi/getBoards";
import getSpecialization from "../../actions/MasterDataApi/getSpecialization";
import { recallData } from "../../store/studentProfileSlice";
import { toast } from "react-toastify";

const AddEducation = ({ onClose, type, educationData }) => {
  const user = useSelector((state) => state?.auth?.userData);
  console.log(user);
  const studentProfile = useSelector(
    (state) => state?.studentProfile?.studentProfileData
  );
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();
  const [highestQualication, setHighestQualication] = useState([]);
  const [courses, setCourses] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [boards, setBoards] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [specialization, setSpecialization] = useState([]);
  const [errors, setErrors] = useState({});

  const preData = async () => {
    try {
      const highQual = await getHighQualList();
      console.log(highQual?.data?.high_qual);
      setHighestQualication(highQual?.data?.high_qual);
      const coursesList = await getCourses();
      console.log(coursesList);
      setCourses(coursesList?.data?.courses);
      const statesList = await getStates();
      console.log(statesList);
      setStates(statesList?.data?.states);
      const institutesList = await getInstitutes();
      console.log(institutesList);
      setInstitutes(institutesList?.data?.institutes);
      let speData = {
        id_course: 1,
      };
      const data = {
        is_grad: 1,
      };

      const cityData = {
        id_state: 1,
      };
      const boardList = await getBoards(data);
      console.log("board", boardList?.data?.boards);
      setBoards(boardList?.data?.boards);

      if (type === "edit") {
        console.log("educationData", educationData);
        setValue("course_name", educationData?.id_course);
        setValue("institute_name", educationData?.id_institute);
        // const hq_id = highestQualication?.find(
        //   (hq) => hq?.highest_qualification === educationData?.highest_qualification
        // ).id
        setValue("highest_qualification", educationData?.highest_qualification);
        // console.log("hq_id", hq_id);
        // setValue("highest_qualification", hq_id);

        speData = {
          id_course: educationData?.id_course,
        };
        setValue("year_of_passing", educationData?.year_of_passing);
        setValue("percentage", educationData?.percentage);
        // const board_id = boardList?.data?.boards?.find(
        //   (board) => board?.board_name === educationData?.board_name
        // )?.id
        // console.log("board_id", board_id);
        setValue("board_name", educationData?.board_name);
        // setValue("board_name", board_id);
        setValue("state", educationData?.state);
        setSelectedState(educationData?.state);
        const state_id = states?.find(
          (state) => state?.state === educationData?.state
        )?.id_state;

        cityData.id_state = state_id;
        setValue("city", educationData?.city);

        setValue("pincode", educationData?.pincode);
        setValue("id_course", educationData?.id_course);
      }
      console.log("speData", speData);
      const cityList = await getCities(cityData);
      console.log(cityList?.data?.cities);
      setCities(cityList?.data?.cities);
      const specializationList = await getSpecialization(speData);
      console.log("spe", specializationList?.data?.specializations);
      setSpecialization(specializationList?.data?.specializations);
      setValue("specialization", educationData?.id_specilization);
      console.log("edu", educationData?.id_specilization);
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

  const onSubmit = (data) => {
    addEducationHandler(data);
  };



  const handleCourseChange = (event) => {
    // console.log(event.target)
    setSelectedCourse(event.target.value);
    loadSpecialization(event.target.value);
  };

  const handleStateChange = (e) => {
    // console.log("State :: ", e.target.value);
    setSelectedState(e.target.value);
    const id = states?.find(
      (state) => state?.state === e.target.value

    ).id_state;
    console.log("id", id);
    loadCities(id);
  }

  const loadCities = async (value) => {
    try {
      console.log(value);
      const data = {
        id_state: Number(value),
      };
      console.log(data);
      const citiesList = await getCities(data);
      console.log("cities", citiesList?.data?.cities);
      setCities(citiesList?.data?.cities);
    } catch (error) {
      console.log("Error while getting cities :: ", error);
    }
  };

  const loadSpecialization = async (value) => {
    try {
      console.log(value);
      const data = {
        id_course: Number(value),
      };
      console.log(data);
      const specializationList = await getSpecialization(data);
      console.log(specializationList);
      setSpecialization(specializationList?.data?.specializations);
    } catch (error) {
      console.log("Error while getting specialization :: ", error);
    }
  };

  // useEffect(() => {

  //   loadSpecialization();
  // }, [selectedCourse]);

  const addEducationHandler = async (formData) => {
    try {
      console.log(formData);
      const board_id = boards?.find(
        (board) => board?.board_name === formData?.board_name
      )?.id
      const hq_id = highestQualication?.find(
        (hq) => hq?.highest_qualification === formData?.highest_qualification
      )?.id
      let data = {
        id_self_student: user?.id_self_student || "",
        usercode: user?.usercode || "",
        year_of_passing: Number(formData?.year_of_passing) || 0,
        id_qual: Number(hq_id) || 0,
        id_institute: Number(formData?.institute_name) || 0,
        id_course: Number(selectedCourse) || 0,
        percentage: Number(formData?.percentage) || 0,
        id_specilization: Number(formData?.specialization) || 0,
        id_board: Number(board_id) || 0,
      };


      console.log('data edit wala', data);
      if (type === "edit") {
        data = {
          ...data,
          id_student_qualification: educationData?.id,
        };
      }

      console.log(data);
      const res = await addEducation(data);
      if (res?.data?.code === 1000) {
        console.log("res1", res);
        toast.success(`${type === "edit" ? "Edited" : "Added"} Successfully`);
        onClose();
        dispatch(recallData());
      } else {
        // toast.error(`${type === "edit" ? "Edited" : "Added"} Not Added`);
      }

      console.log("res1", res);
    } catch (error) {
      console.log("Error while adding education :: ", error);
    }
  };

  return (
    <div className=" flex min-h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className=" w-1/2 h-2/3 rounded-md shadow-md bg-white">
        <div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
          <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
            {type === "edit" ? "Edit" : "Add"} Education
          </h1>
          <img
            className="mr-8 items-center mt-2 h-8 cursor-pointer"
            src={close}
            onClick={onClose}
            alt="Close"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-5 justify-around px-5 mt-2">
            <div className="relative h-14 mb-3 w-1/2">
              <div>
                <select
                  id="qualification_select"
                  className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  defaultValue={""}
                  {...register("course_name", { required: true })}
                  onChange={handleCourseChange}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {courses?.map((course) => (
                    <option key={course?.id} value={course.id}>
                      {course.course_name}
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
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Course Name
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
                  defaultValue={""}
                  {...register("institute_name", {
                    required: true,
                  })}
                // onChange={(e) => setInstituteName(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {institutes?.map((institute) => (
                    <option key={institute?.id} value={institute.id}>
                      {institute?.institute_name}
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
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Institute Name
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
                  defaultValue={""}
                  {...register("highest_qualification", {
                    required: true,
                  })}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {highestQualication?.map((qual) => (
                    <option key={qual?.id} value={qual.highest_qualification}>
                      {qual.highest_qualification}
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
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Highest Qualification
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
                  defaultValue={""}
                  {...register("board_name", {
                    required: true,
                  })}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {boards?.map((institute) => (
                    <option key={institute?.id} value={institute?.board_name}>
                      {institute?.board_name}
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
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Board
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
                  // defaultValue={""}
                  {...register("specialization", {
                    required: true,
                  })}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {specialization?.map((qual) => (
                    <option key={qual?.id} value={qual.id}>
                      {qual.specialization}
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
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    Specialization
                  </label>
                </div>
              </div>
              {errors.id_hq && (
                <div className="error text-red-600 font-medium text-sm">
                  {errors?.id_hq}
                </div>
              )}
            </div>
            <div className="relative h-12 w-1/2 mb-6">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  defaultValue={""}
                  {...register("percentage", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Percentage
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
          <div className="flex gap-5 justify-around px-5 mt-2 mb-2">
            <div className="relative h-12 w-1/2">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  defaultValue={""}
                  {...register("year_of_passing", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Year of Passing
                  </label>
                </div>
              </div>

              {errors.id_hq && (
                <div className="error text-red-600 font-medium text-sm">
                  {errors?.id_hq}
                </div>
              )}
            </div>
            {/* <div className="relative h-14 mb-3 w-1/2">
              <div>
                <select
                  id="qualification_select"
                  className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  defaultValue={""}
                  {...register("state", { required: true })}
                  onChange={handleStateChange}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {states?.map((state) => (
                    <option key={state?.id} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
                <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                  <FaAngleDown />
                </div>
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    State
                  </label>
                </div>
              </div>
              {errors.id_hq && (
                <div className="error text-red-600 font-medium text-sm">
                  {errors?.id_hq}
                </div>
              )}
            </div> */}
          </div>
          {/* <div className="flex gap-5 justify-around px-5 mt-2">
            <div className="relative h-14 mb-3 w-1/2">
              <div>
                <select
                  id="qualification_select"
                  className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                  defaultValue={""}
                  {...register("city", {
                    required: true,
                  })}
                >
                  <option value="" disabled hidden>
                    Select
                  </option>
                  {cities?.map((city) => (
                    <option key={city?.id} value={city.city}>
                      {city.city}
                    </option>
                  ))}
                </select>
                <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                  <FaAngleDown />
                </div>
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <img src={message} alt="" className="h-5 w-5" />
                  <label htmlFor="" className="pl-2">
                    City
                  </label>
                </div>
              </div>
              {errors.id_hq && (
                <div className="error text-red-600 font-medium text-sm">
                  {errors?.id_hq}
                </div>
              )}
            </div>
            <div className="relative h-12 w-[48%] mb-6">
              <div>
                <input
                  type="text"
                  id="floating_filled"
                  className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                  placeholder=""
                  defaultValue={""}
                  {...register("pincode", {
                    required: true,
                  })}
                />
                <div
                  htmlFor="floating_filled"
                  className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                >
                  <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                  <label htmlFor="" className="pl-2">
                    Pincode
                  </label>
                </div>
              </div>

              {errors.id_hq && (
                <div className="error text-red-600 font-medium text-sm">
                  {errors?.id_hq}
                </div>
              )}
            </div>
          </div> */}

          <div
            onClick={addEducationHandler}
            className="flex justify-center items-center"
          >
            <button
              type="Submit"
              className="rounded-full bg-blue-900 text-white px-8 py-1 "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEducation;
