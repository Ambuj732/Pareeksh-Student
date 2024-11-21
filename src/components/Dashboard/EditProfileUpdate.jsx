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
import { useDispatch, useSelector } from "react-redux";
import getLanguageList from "../../actions/MasterDataApi/getLanguageList";
import updatePersonal from "../../actions/Dashboard/updatePersonal";
import addStudentLanguage from "../../actions/Dashboard/addStudentLanguage";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import { recallData } from "../../store/studentProfileSlice";
import { toast } from "react-toastify";

const EditProfileUpdate = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    getValues: getValuesForm1,
    setValue: setValueForm1,
    formState: { errors: errorsForm1 },
  } = useForm();
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
  } = useForm();
  const {
    register: registerForm3,
    handleSubmit: handleSubmitForm3,
    setValue: setValueForm3,
    formState: { errors: errorsForm3 },
  } = useForm();
  const [highestQualication, setHighestQualication] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [differentlyAbled, setDifferentlyAbled] = useState([
    { id: 1, option: "Yes" },
    { id: 2, option: "No" },
  ]);
  const [martialStatus, setMartialStatus] = useState([
    { id: 0, option: "Unmarried" },
    { id: 1, option: "Married" },
  ]);
  const [proficient, setProficient] = useState([
    { id: 1, proficiency: "Beginner" },
    { id: 2, proficiency: "Proficient" },
    { id: 3, proficiency: "Expert" },
  ]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const dispatch = useDispatch();

  // console.log(states)

  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state?.auth?.userData);
  const studentProfile = useSelector(
    (state) => state?.studentProfile?.studentProfileData
  );
  // console.log(user);
  console.log('profileData', studentProfile);

  useEffect(() => {
    if (studentProfile) {
      setValueForm1("differentlyAbled", studentProfile?.differently_abled);
      setValueForm1("martialStatus", studentProfile?.martial);
    }
  }, [studentProfile, setValueForm1]);

  useEffect(() => {
    if (studentProfile) {
      setValueForm3("state", studentProfile?.id_state);
      setSelectedState(studentProfile?.id_state); // Set selected state
    }
  }, [studentProfile, setValueForm3]);

  useEffect(() => {
    if (studentProfile && cities.length > 0) {
      setValueForm3("city", studentProfile?.id_city);
      setSelectedCity(studentProfile?.id_city); // Set selected city
    }
  }, [studentProfile, cities, setValueForm3]);




  const preData = async () => {
    try {
      const highQual = await getHighQualList();
      setHighestQualication(highQual?.data?.high_qual);
      const langs = await getLanguageList();
      // console.log(langs?.data?.lang_list);
      setLanguages(langs?.data?.lang_list);
      const statesList = await getStates();
      // console.log(statesList);
      setStates(statesList?.data?.states);
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


  useEffect(() => {
    const loadCities = async () => {
      try {
        // console.log(selectedState);
        const data = {
          id_state: Number(selectedState),
        };
        console.log(data);
        const citiesList = await getCities(data);
        // console.log(citiesList);
        setCities(citiesList?.data?.cities);
      } catch (error) {
        console.log("Error while getting cities :: ", error);
      }
    };
    loadCities();
  }, [selectedState]);

  function extractDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const updateMartialStatusHandler = async (formData) => {
    try {
      console.log(formData);
      console.log(studentProfile);
      const data = {
        id_city: studentProfile?.id_city,
        gender: studentProfile?.gender,
        martial: Number(formData?.martialStatus),
        differently_abled: Number(formData?.differentlyAbled),
        dob: extractDate(studentProfile?.date_of_birth),
        id_cast_category: studentProfile?.id_cast_category,
        name: studentProfile?.student_name,
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
        id_state: studentProfile?.id_state,
      };
      console.log('after marital', data);
      const response = await updatePersonal(data);
      console.log("res", response);
      if (response.data.code === 1000) {
        console.log(response);
        toast.success("The martial status updated successfully");
        onClose();
        dispatch(recallData());
      } else {
        console.log("Error while updating martial status :: ", response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log("Error while updating language :: ", error);
    }
  };

  const addLanguageHandler = async (formData) => {
    try {
      console.log('before language', formData);
      const data = {
        id_lang: Number(formData?.language),
        usercode: user?.usercode,
        read: formData?.read ? 1 : 0,
        id_self_student: user?.id_self_student,
        speak: formData?.speak ? 1 : 0,
        prof: Number(formData?.proficient),
        write: formData?.write ? 1 : 0,
      };
      console.log('after language', data);
      const response = await addStudentLanguage(data);
      console.log(response);
      toast.success("The language is added successfully...");
      onClose();
      dispatch(recallData());
    } catch (error) {
      console.log("Error while adding language :: ", error);
    }
  };


  const updateCurrentLocationHandler = async (formData) => {
    try {
      console.log(formData);
      console.log(user);
      console.log('before api', studentProfile);
      const data = {
        id_city: Number(formData?.city),
        gender: studentProfile?.gender,
        martial: studentProfile?.martial,
        differently_abled: studentProfile?.differently_abled,
        dob: extractDate(studentProfile?.date_of_birth),
        id_cast_category: studentProfile?.id_cast_category,
        name: studentProfile?.student_name,
        id_self_student: user?.id_self_student,
        usercode: user?.usercode,
        id_state: Number(selectedState),
      };
      console.log('after api', data);
      const response = await updatePersonal(data);
      console.log(response);
      toast.success("The location updated successfully.....");
      onClose();
      dispatch(recallData());
    } catch (error) {
      console.log("Error while updating current location :: ", error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center  fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="w-1/2 h-2/3 rounded-md shadow-md ">
        <div className="flex justify-between items-center bg-blue-100  rounded-t-md h-12">
          <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
            Edit Profile ..
          </h1>
          <img
            className="mr-8 items-center mt-2 h-8  cursor-pointer"
            src={close}
            onClick={onClose}
          />
        </div>
        <div className="overflow-y-scroll h-[90%]  overflow-hidden bg-white">
          <div>
            {/* { Form 1} */}
            <form
              id="updateMartialStatusHandler"
              name="updateMartialStatusHandler"
              onSubmit={handleSubmitForm1(updateMartialStatusHandler)}
            >
              <div className="flex justify-between px-5 mt-2">
                <div className="relative h-14 mb-3 w-[48%]">
                  <div>
                    <select
                      id="martial-status"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...registerForm1("martialStatus", {
                        required: true,
                      })}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {martialStatus?.map((status) => (
                        <option key={status?.id} value={status.id}>
                          {status.option}
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
                        Martial Status
                      </label>
                    </div>
                  </div>
                  {errors.id_hq && (
                    <div className="error text-red-600 font-medium text-sm">
                      {errors?.id_hq}
                    </div>
                  )}
                </div>
                <div className="relative h-14 mb-3 w-[48%]">
                  <div>
                    <select
                      id="differently_abled"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...registerForm1("differentlyAbled", {
                        required: true,
                      })}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {differentlyAbled?.map((ele) => (
                        <option key={ele?.id} value={ele.id}>
                          {ele.option}
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
                        Differently abled
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
                className="ml-5 px-5 h-10 rounded-full w-24 border bg-[#1C4481] text-white"
              >
                Save
              </button>
            </form>
            {/* {Form 2} */}
            <form onSubmit={handleSubmitForm2(addLanguageHandler)}>
              <div>
                <h1 className="px-5 mt-7 font-semibold">
                  Communication Language(s)
                </h1>
              </div>
              <div className="flex gap-5 justify-around px-5 mt-5">
                <div className="relative h-14 mb-3 w-1/2">
                  <div>
                    <select
                      id="language"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      defaultValue=""
                      {...registerForm2("language", {
                        required: true,
                      })}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {languages?.map((language) => (
                        <option key={language?.id} value={language.id}>
                          {language.lang_name}
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
                        Language
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
                      id="proficient"
                      className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                      {...registerForm2("proficient", {
                        required: true,
                      })}
                    >
                      <option value="" disabled hidden>
                        Proficient
                      </option>
                      {proficient?.map((proc) => (
                        <option key={proc?.id} value={proc.id}>
                          {proc.proficiency}
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
              <div className="flex mx-5 gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="read"
                    name="read"
                    {...registerForm2("read")}
                  />
                  <label htmlFor="read">Read</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="speak"
                    name="speak"
                    {...registerForm2("speak")}
                  />
                  <label htmlFor="speak">Speak</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="write"
                    name="write"
                    {...registerForm2("write")}
                  />
                  <label htmlFor="write">Write</label>
                </div>
              </div>
              <button
                type="submit"
                className="h-10 bg-[#f7f8fa] rounded-full justify-center border w-44 flex items-center mx-4 px-5 mt-4 border-blue-500"
              >
                Add Language
              </button>
            </form>
            {/* {Form 2} */}
            <form onSubmit={handleSubmitForm3(updateCurrentLocationHandler)}>
              <div>
                <h1 className="px-5 mt-7 font-semibold">Current Location</h1>
              </div>
              <div className="flex gap-5 justify-around px-5 mt-5">
                <div className="relative h-14 mb-3 w-1/2">
                  {states.length > 0 && (
                    <div>
                      <select
                        className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        id="state"
                        {...registerForm3("state", { required: true })}
                        onChange={(e) => {
                          setSelectedState(e.target.value);
                        }}
                        value={selectedState} // Ensure controlled component
                      >
                        <option value="" disabled hidden>Select State</option>
                        {states.map((state) => (
                          <option key={state.id_state} value={state.id_state}>
                            {state.state}
                          </option>
                        ))}
                      </select>
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

                  )}
                  {errors.id_hq && (
                    <div className="error text-red-600 font-medium text-sm">
                      {errors?.id_hq}
                    </div>
                  )}
                </div>
                <div className="relative h-14 mb-3 w-1/2">
                  {selectedState && cities.length > 0 && (
                    <div>
                      <select
                        id="city"
                        className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        {...registerForm3("city", { required: true })}
                        onChange={(e) => {
                          setSelectedCity(e.target.value);
                        }}
                        value={selectedCity} // Ensure controlled component
                      >
                        <option value="" disabled hidden>Select City</option>
                        {cities.map((city) => (
                          <option key={city.id_city} value={city.id_city}>
                            {city.city}
                          </option>
                        ))}
                      </select>
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
                  )}
                  {errors.id_hq && (
                    <div className="error text-red-600 font-medium text-sm">
                      {errors?.id_hq}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between px-5 mt-2">
                {/* <div className="relative h-14 mb-3 w-[48%]">
                  <div>
                    <input
                      type="text"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...register("username", {
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
                </div> */}
              </div>
              <button
                type="submit"
                className="ml-5 px-5 h-10 rounded-full w-24 border bg-[#1C4481] text-white"
              >
                Save
              </button>
            </form>
            {/* <div>
              <h1 className="px-5 mt-7 font-semibold">Desired Work Location</h1>
            </div> */}
            {/* <hr className="border-black mt-1 mx-4"></hr> */}
            {/* <div className="flex gap-5 justify-around px-5 mt-5">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      Noida
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                   
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Town
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
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      Guatam Budha Nagar
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                   
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      District
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
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      UttarPradesh
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                   
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
              </div>
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      20310
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
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
            {/* <div className="flex gap-5 justify-around px-5 mt-2">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      Android Developer
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                  
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Current Profile
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
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      5 years
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                 
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Total Work Exeperience
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
            <div className="flex px-5 mt-2">
              <div className="relative h-14 mb-3 w-1/2">
                <div>
                  <select
                    id="qualification_select"
                    className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                    defaultValue=""
                    onChange={(e) => handleSelectQualification(e.target.value)}
                    {...register("qualification", {
                      required: true,
                    })}
                  >
                    <option value="" disabled hidden>
                      4-5 lakhs
                    </option>
                    {highestQualication?.map((qualName) => (
                      <option key={qualName?.id} value={qualName.id}>
                        {qualName.highest_qualification}
                      </option>
                    ))}
                  </select>
                  <div className="flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-between">
                   
                  </div>
                  <div
                    htmlFor="floating_filled"
                    className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                  >
                    <img src={message} alt="" className="h-5 w-5" />
                    <label htmlFor="" className="pl-2">
                      Current Salary
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
          </div>
          <div className="flex justify-center items-center mt-5 mb-4">

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileUpdate;
