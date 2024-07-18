import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

//Data to Send in Api
// const data = {
// 	usercode: eHf6CwUzRrUe,
// 	id_self_student: 1,
// };

const removeStudentsKeySkill = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/removeKeySkill?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Student Profile Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting student profile :: ", error);
	}
};

export default removeStudentsKeySkill;
