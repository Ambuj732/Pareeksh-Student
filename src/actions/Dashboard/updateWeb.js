import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	usercode: "",
// 	id_self_student: "",
// 	name: "",
// 	dob: "",
// 	gender: "",
// 	id_city: "",
// 	id_state: "",
// 	id_hq: "",
// };

const updateWeb = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/updateProfileWeb?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Update Mobile Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while updating web :: ", error);
	}
};

export default updateWeb;
