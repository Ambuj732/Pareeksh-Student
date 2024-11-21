import { useEffect, useState } from "react";
import close from "../../assets/Dashboard/close.png";
import { IoPerson } from "react-icons/io5";
import { useForm } from "react-hook-form";
import message from "../../assets/LoginScreen/message.png";
import mobile from "../../assets/Dashboard/mobile.png";
import updatePersonal from "../../actions/Dashboard/updatePersonal";
import { useDispatch, useSelector } from "react-redux";
import { recallData } from "../../store/studentProfileSlice";
import getCities from "../../actions/LoginScreens/getCities";
import getStates from "../../actions/LoginScreens/getStates";
import { toast } from "react-toastify";
import updateEmail from "../../actions/Dashboard/updateEmail";
import verifyOtp from "../../actions/Dashboard/verifyOtp";
import updatePassword from "../../actions/Dashboard/updatePassword";


// eslint-disable-next-line react/prop-types
function EditProfile({ onClose, data }) {
  const { register, handleSubmit, setValue } = useForm();
  const {
    register: registerForm3,
    setValue: setValueForm3,
  } = useForm();
  const {
    register: registerForm4,
    setValue: setValueForm4,
    handleSubmit: handleSubmitForm4,
  } = useForm();

  const dispatch = useDispatch()
  const user = useSelector((state) => state?.auth?.userData);
  console.log(user);
  const studentProfile = useSelector(
    (state) => state?.studentProfile?.studentProfileData,
  );
  console.log(studentProfile);
  console.log(data);

  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [martialStatus, setMartialStatus] = useState([
    { id: 0, option: "Unmarried" },
    { id: 1, option: "Married" },
  ]);
  const [differentlyAbled, setDifferentlyAbled] = useState([
    { id: 1, option: "Yes" },
    { id: 2, option: "No" },
  ]);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }




  useEffect(() => {
    if (studentProfile) {
      setValue("firstname", studentProfile.student_name.split(" ")[0]);
      setValue("lastname", studentProfile.student_name.split(" ")[1]);
      setValue("gender", studentProfile.gender === 1 ? "male" : "female");
      setValue("date", studentProfile.date_of_birth.split("T")[0]);
      setValue("martialStatus", studentProfile.martial);
      setValue("differentlyAbled", studentProfile.differently_abled);
      // setValue("city", studentProfile?.id_city);
      // setValue("state", studentProfile?.id_state);



    }
  }, [studentProfile, setValue]);

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

  useEffect(() => {
    if (studentProfile) {
      setValueForm4("student_email", studentProfile?.email_id);
      setValueForm4("student_mobile", studentProfile?.mobile_no);
    }
  }, [studentProfile, setValueForm4]);


  const preData = async () => {
    try {
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


  const updateProfileHandler = async (formData) => {
    try {
      console.log(formData);
      console.log(formData?.martialStatus)
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);

      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        id_city: Number(selectedCity),
        gender: formData?.gender == "male" ? 1 : 0,
        martial: Number(formData?.martialStatus),
        differently_abled: Number(formData?.differentlyAbled),
        dob: formData?.date,
        id_cast_category: studentProfile?.id_cast_category,
        name: formData?.firstname + " " + formData?.lastname,
        id_state: Number(selectedState),
        mobile_no: studentProfile?.mobile_no,
        user_name: studentProfile?.user_name,
        email_id: studentProfile?.email_id,
      };

      console.log(data);

      const response = await updatePersonal(data);
      if (response.data.code === 1000) {
        console.log(response);
        toast.success("The Profile updated successfully");
        onClose();
        dispatch(recallData());
        setTimeout(() => {
          window.location.reload();
        }, 3000)
      } else {
        console.log("Error while updating profile :: ", response.data.message);
      }
    } catch (error) {
      console.log("Error while editing profile :: ", error);
    }
  };


  const changeUserInfo = async (field, value) => {
    try {
      console.log(`Updating ${field} to:`, value);
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);

      const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        [field]: value, // Dynamically setting the field (email or mobile)
      };
      console.log(data);

      const response = await updateEmail(data); // Assuming same API for both email and phone
      if (response.data.code === 1000) {
        console.log(response);
        toast.success(`The ${field} updated successfully`);
        handleOpenModal();
      } else {
        console.log(`Error while updating ${field} :: `, response.data.message);
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(`Error while editing ${field} :: `, error);
    }
  };


  const verifyOtpForm = async (formData1) => {
    try {
      console.log(formData1);
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data1 = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        otp: Number(otp),
        student_email: email,
      };
      console.log(data1);
      const response = await verifyOtp(data1);
      if (response.data.code === 1000) {
        console.log(response);
        toast.success("The Otp verify successfully");
        handleCloseModal();
        onClose();
        // window.location.reload();
      }
      else if (response.data.code === 1001) {
        toast.error(response.data.status);
      }

      else {
        console.log("Error while updating profile :: ", response.data.message);
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.log("Error while editing profile :: ", error);
      toast.error("Invalid OTP", error);
    }
  }

  const changePassword = async (formData2) => {
    try {
      console.log(formData2)
      const user = JSON.parse(localStorage.getItem("ps_loguser"));
      console.log("User :: ", user);
      const data2 = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
        new_password: newPassword,
        old_password: oldPassword,
      };
      console.log(data2);
      const response = await updatePassword(data2);
      if (response.data.code === 1000) {
        console.log(response);
        toast.success("The Password updated successfully");
        handleCloseModal();
        onClose();
        // window.location.reload();
      }
      else if (response.data.code === 1001) {
        toast.error(response.data.status);
      }
    }
    catch (error) {
      console.log("Error while editing profile :: ", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
      <div className="w-1/2 h-3/3 rounded-md shadow-md bg-white">
        <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
          <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
            Edit Profile
          </h1>
          <img
            className="mr-8 items-center mt-2 h-8 cursor-pointer"
            src={close}
            alt="Close"
            onClick={onClose}
          />
        </div>
        <div>
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-tab"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "profile"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                  id="profile-tab"
                  onClick={() => handleTabClick("profile")}
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "profile"}
                >
                  Update Profile
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "dashboard"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                  id="dashboard-tab"
                  onClick={() => handleTabClick("dashboard")}
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected={activeTab === "dashboard"}
                >
                  Update Email
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "settings"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                  id="settings-tab"
                  onClick={() => handleTabClick("settings")}
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected={activeTab === "settings"}
                >
                  Update Phone
                </button>
              </li>
              <li role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "contacts"
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                  id="contacts-tab"
                  onClick={() => handleTabClick("contacts")}
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected={activeTab === "contacts"}
                >
                  Update Password
                </button>
              </li>
            </ul>
          </div>
          <div id="default-tab-content">
            <div
              className={`p-4 rounded-lg  dark:bg-gray-800 ${activeTab === "profile" ? "" : "hidden"
                }`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <form onSubmit={handleSubmit(updateProfileHandler)}>
                <div className="flex gap-5 justify-around px-5 mt-2">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="text"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("firstname", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          First Name
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="text"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("lastname", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Last Name
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-around px-5 mt-10">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id="gender"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        {...register("gender", {
                          required: true,
                        })}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="transgender">Transgender</option>
                      </select>
                      <div className="absolute top-4 left-2 transform -translate-y-1/2">
                        <IoPerson className="text-[#1C4481]" />
                      </div>
                      <div
                        htmlFor="gender"
                        className="absolute text-base pl-8 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <label htmlFor="" className="pl-2">
                          Please Select Gender
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="Date"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...register("date", {
                          required: true,
                        })}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <IoPerson className="absolute top-1/2 left-2 transform -translate-y-1/2 text-[#1C4481]" />
                        <label htmlFor="" className="pl-2">
                          Date of Birth
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-around px-5 mt-10">
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id="martialStatus"
                        className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        {...register("martialStatus", {
                          required: true,
                        })}
                        // ensure this is bound to your form state
                        onChange={(e) => setValue("martialStatus", e.target.value)} // or however you're managing the form data
                      >
                        <option value="" disabled hidden>Select</option>
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
                  </div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <select
                        id="differently_abled"
                        className="block pl-8 pr-3 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0"
                        defaultValue=""
                        {...register("differentlyAbled", {
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
                  </div>
                </div>
                <div className="flex gap-5 justify-around px-5 mt-10">
                  <div className="relative h-12 w-1/2">
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
                  </div>

                  <div className="relative h-12 w-1/2">
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

                  </div>
                </div>
                <div className="flex items-center justify-center mt-10 mb-5 ">
                  <button
                    type="submit"
                    className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div
              className={`p-4 rounded-lg  dark:bg-gray-800 ${activeTab === "dashboard" ? "" : "hidden"
                }`}
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <form
                onSubmit={handleSubmit(() => changeUserInfo("student_email", email))} // Passing the field name and value
              >
                <div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="email"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...registerForm4("student_email", {
                          required: true,
                        })}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-10 mb-5">
                    <button
                      type="submit"
                      className="text-white font-sans text-lg px-8 py-1 rounded-full bg-blue-800"
                    >
                      Update Email
                    </button>
                  </div>
                </div>
              </form>

            </div>
            <div
              className={`p-4 rounded-lg  dark:bg-gray-800 ${activeTab === "settings" ? "" : "hidden"
                }`}
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <form
                onSubmit={handleSubmit(() => changeUserInfo("student_mobile", phone))} // Passing the field name and value
              >
                <div>
                  <div className="relative h-12 w-1/2">
                    <div>
                      <input
                        type="number"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...registerForm4("student_mobile", {
                          required: true,
                        })}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={mobile} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          Mobile
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-10 mb-5">
                    <button
                      type="submit"
                      className="text-white font-sans text-lg px-8 py-1 rounded-full bg-blue-800"
                    >
                      Update Phone
                    </button>
                  </div>
                </div>
              </form>

            </div>
            <div
              className={`p-4 rounded-lg  dark:bg-gray-800 ${activeTab === "contacts" ? "" : "hidden"
                }`}
              id="contacts"
              role="tabpanel"
              aria-labelledby="contacts-tab"
            >
              <form onSubmit={handleSubmit(changePassword)}>
                <div className="flex space-x-4"> {/* Flex container with space between the items */}
                  <div className="relative h-12 w-1/2"> {/* Container for Old Password */}
                    <input
                      type="password"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...registerForm4("old_password", {
                        required: true,
                      })}
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                    />
                    <div
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 flex items-center"
                    >
                      <img src={mobile} alt="" className="h-5 w-5" />
                      <label htmlFor="old_password" className="pl-2">
                        Old Password
                      </label>
                    </div>
                  </div>

                  <div className="relative h-12 w-1/2"> {/* Container for New Password */}
                    <input
                      type="password"
                      id="floating_filled"
                      className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                      placeholder=""
                      {...registerForm4("new_password", {
                        required: true,
                      })}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                    <div
                      className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 flex items-center"
                    >
                      <img src={mobile} alt="" className="h-5 w-5" />
                      <label htmlFor="new_password" className="pl-2">
                        New Password
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-10 mb-5">
                  <button
                    type="submit"
                    className="text-white font-sans text-lg px-8 py-1 rounded-full bg-blue-800"
                  >
                    Update Password
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>

        {openModal && (
          <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 z-50 bg-black bg-opacity-50">
            <div className="w-1/3 h-3/3 rounded-md shadow-md bg-white">
              <div className="flex justify-between items-center bg-blue-100 rounded-t-md h-12">
                <h1 className="ml-8 items-center mt-3 font-semibold text-blue-800">
                  OTP Verification
                </h1>
                <img
                  className="mr-8 items-center mt-2 h-8 cursor-pointer"
                  src={close}
                  alt="Close"
                  onClick={handleCloseModal}
                />
              </div>
              <form onSubmit={handleSubmit(verifyOtpForm)}>
                <div className="p-8">

                  <div className="relative h-12 w-1/1">
                    <div>
                      <input
                        type="number"
                        id="floating_filled"
                        className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
                        placeholder=""
                        {...registerForm4("otp", {
                          required: true,
                        })}
                        onChange={(e) => {
                          setOtp(e.target.value);
                        }}

                      />
                      <div
                        htmlFor="floating_filled"
                        className="absolute text-base pl-5 text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
                      >
                        <img src={message} alt="" className="h-5 w-5" />
                        <label htmlFor="" className="pl-2">
                          OTP
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-10 mb-5 ">
                    <button
                      type="submit"
                      className="text-white font-sans text-lg  px-8 py-1 rounded-full bg-blue-800"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

  );
}

export default EditProfile;
