import React, { useState } from "react";
import marital from "../../assets/Dashboard/marital.png";
import category from "../../assets/Dashboard/category.png";
import abled from "../../assets/Dashboard/abled.png";
import language from "../../assets/Dashboard/language.png";
import key from "../../assets/Dashboard/key.png";
import changePassword from "../../actions/Dashboard/changePassword";
import { useForm } from "react-hook-form";
import ApiResponse from "../ApiResponse";

function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const [response, setResponse] = useState("");

  const changePasswordHandler = async (formData) => {
    try {
      if (formData?.newPassword != formData?.confirmPassword) {
        console.log("New Password != Confirm Password");
        setResponse("Password Mismatch");
        return;
      }
      const data = {
        usercode: "7rcASrx9lZXP",
        id_self_student: 116,
        new_password: formData?.newPassword,
        old_password: formData?.oldPassword,
      };
      const response = await changePassword(data);
      if (response.data.code === 1000) {
        setResponse("Password Changed Successfully");
        return;
      }
      if (response.data.code != 1000) {
        setResponse("Password Change Unsuccessful");
        console.log("Error");
      }
    } catch (error) {
      console.log("Error while changing password :: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(changePasswordHandler)}
      className="flex flex-col gap-8 py-4"
    >
      <div className="flex flex-col gap-1 shadow-allBorder rounded-md px-4 py-2 w-1/2">
        <div className="flex gap-2">
          <img src={key} alt="" className="w-5" />
          <span>Old Password</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="**************"
            className="outline-none focus:outline-none px-7 placeholder:text-black text-lg w-full border-none"
            {...register("oldPassword", { required: true })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 shadow-allBorder rounded-md px-4 py-2 w-1/2">
        <div className="flex  gap-2">
          <img src={key} alt="" className="w-5" />
          <span>New Password</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="**************"
            className="outline-none px-7 placeholder:text-black text-lg w-full border-none"
            {...register("newPassword", { required: true })}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 shadow-allBorder rounded-md px-4 py-2 w-1/2">
        <div className="flex  gap-2">
          <img src={key} alt="" className="w-5" />
          <span>New Re-Enter Password</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="**************"
            className="outline-none px-7 placeholder:text-black text-lg w-full border-none"
            {...register("confirmPassword", { required: true })}
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#1C4481] rounded-full w-28 mx-4 h-10 flex items-center justify-center text-white"
      >
        <span>Save</span>
      </button>
      {response && <ApiResponse message={response} setError={setResponse} />}
    </form>
  );
}

export default ChangePassword;
