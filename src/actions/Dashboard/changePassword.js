import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	usercode: "",
// 	id_self_student: 1,
// 	new_password: "",
// 	old_password: "",
// };

const changePassword = async (data) => {
	try {
		const queryString = Object.keys(data)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						data[key]
					)}`
			)
			.join("&");
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/changePassword?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Change Password Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while changing password :: ", error);
	}
};

export default changePassword;
