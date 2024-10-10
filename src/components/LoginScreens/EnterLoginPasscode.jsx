import { BLANK_MSG, TRY_AGAIN_MSG } from "../../constants";
import React, { useState } from "react";
import arrowLeft from "../../assets/LoginScreen/arrowLeft.png";
import { TbPassword } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import loginWithPasscode from "../../actions/LoginScreens/loginWithPasscode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SlidingMessage from "../ApiResponse";

function EnterLoginPasscode() {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const errors = {
		login_code: "",
	};
	const errorMsg = TRY_AGAIN_MSG;
	const loginWithPasscodeHandler = async (formData, e) => {
		e.preventDefault();
		//setMessage('Loading...')
		try {
			/* 			const data = {
				login_code: "102RZ127",
				os: "1sdsa",
				build: "dsadsa",
				notId: "sadsad",
			}; */
			let response = await loginWithPasscode(formData);
			console.log(response);
			if (response.status == 200) {
				const code = response?.data?.code;
				const message = response?.data?.status;
				if (code == 1000) {
					await axios
						.get("https://ipapi.co/json/")
						.then(function (res) {
							console.log(res);
							var geoipresponse = res;
							if (geoipresponse != undefined) {
								localStorage.setItem(
									"supspw_geoIPStu",
									JSON.stringify(res)
								);
							}
							var settings = response.data.settings;
							localStorage.setItem(
								"ps_loguser",
								JSON.stringify({
									usercode: response.data.usercode,
									userid: response.data.user_id,
									subuserid: response.data.sub_user_id,
									name: response.data.name,
									code: formData?.login_code,
									id: response.data.std_id,
									examstatus: response.data.isvivaDone,
								})
							);
							if (
								typeof settings != undefined ||
								typeof settings != "undefined"
							) {
								sessionStorage.setItem(
									"pkshn_exam_set",
									JSON.stringify(settings)
								);
							}
							var practical_id = response.data.practical_id;

							if (
								(response.data.isvivaDone == 1 ||
									response.data.isvivaDone == 3) &&
								settings.descriptive == 1 &&
								response.data.descriptive == 0
							) {
								navigate("/descriptive");
							} else if (typeof practical_id != "undefined") {
								let sett = {
									examid: response.data.exam_id,
									practicalid: response.data.practical_id,
								};
								sessionStorage.setItem(
									"pkshn_vc_set",
									JSON.stringify(sett)
								);
								var qstring =
									data.usercode +
									"//@spwd++sup@//" +
									response.data.exam_id +
									"//@spwd++sup@//" +
									response.data.practical_id +
									"//@spwd++sup@//" +
									response.data.std_id;
								var parms = window.btoa(qstring);
								navigate("/practical-welcome?" + parms);
							} else if (settings.otp == 1) {
								//var parms = this.globals.getRandUrl('otp');
								var qstring =
									response.data.usercode +
									"//@spwd++sup@//" +
									response.data.user_id +
									"//@spwd++sup@//" +
									response.data.sub_user_id +
									"//@spwd++sup@//" +
									response.data.std_id +
									"//@spwd++sup@//" +
									6;
								var parms = window.btoa(qstring);
								navigate(
									"/login-with-passcode/verify-otp?q=" + parms
								);
							} else {
								//var parms = this.globals.getRandUrl('verify');
								navigate("/login-with-passcode/verify-profile");
								//this.router.navigate(['verify'], { queryParams: { page: 1 } });
							}
						})
						.catch(function (error) {
							// handle error
							console.log(error);
						});

					console.log("redirect to next page");
				} else {
					setError(message);
					console.log("Message :: ", message);
					return;
				}
			} else {
				setError(TRY_AGAIN_MSG);
				return;
			}

			//	this.state({ statesss:  response.data});
			console.log("page res: ", response.data.status);
		} catch (error) {
			console.log("Error while logging with passcode :: ", error);
		}
	};

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<form
			onSubmit={handleSubmit(loginWithPasscodeHandler)}
			className="w-1/4 bg-white rounded-3xl right-64 absolute border h-2/3 p-4"
		>
			<div className="flex justify-between items-center">
				<img
					src={arrowLeft}
					alt=""
					onClick={handleBack}
					className="bg-[#1C4481] w-6 h-6 rounded-full cursor-pointer"
				/>
				<div className="flex flex-col items-end">
					<span className="font-semibold text-[#AFAFAF]">
						Candidate
					</span>
					<span className="font-semibold text-[#555555]">Panel</span>
				</div>
			</div>

			<div className="relative h-14 mb-4 mt-14">
				<div>
					<input
						type="text"
						id="floating_filled"
						className="block pl-8 text-black pb-2.5 pt-5 w-full text-base border border-[#6E6E6E] rounded-md appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 peer"
						placeholder=""
						{...register("login_code", {
							required: true,
						})}
					/>
					<div
						htmlFor="floating_filled"
						className="absolute text-base text-[#1C4481] dark:text-[#1C4481] duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-[#1C4481] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto flex items-center"
					>
						<TbPassword className="border rounded w-5 border-[#435DBC] mx-2 text-[#435DBC]" />
						<label htmlFor="" className="pl-2">
							Enter Login Passcode
						</label>
					</div>
				</div>
				{errors.login_code && (
					<p className="text-red-500">{errors.login_code.message}</p>
				)}
			</div>

			<button
				type="submit"
				className="w-full h-12 bg-[#1C4481] text-white rounded-3xl"
			>
				Login
			</button>
			{error && <SlidingMessage message={error} setError={setError} />}
		</form>
	);
}

export default EnterLoginPasscode;
