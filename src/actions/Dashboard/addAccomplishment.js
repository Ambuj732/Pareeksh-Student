import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	id_lang: 10,
// 	usercode: "",
// 	read: 1,
// 	id_self_student: 6,
// 	speak: 0,
// 	prof: 2,
// 	write: 1,
// };

const addStudentLanguage = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentProfile/updateAccomplishment?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Add Student Language Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while adding student language :: ", error);
	}
};

export default addStudentLanguage;
