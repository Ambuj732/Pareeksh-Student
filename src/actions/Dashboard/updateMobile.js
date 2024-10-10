import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

// const data = {
// 	usercode: dKoVbU1jgnD6,
// 	id_self_student: 3,
// 	name: "Deepika",
// 	dob: "1994-07-07",
// 	gender: 2,
// };

const updateMobile = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/updatePersonal?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Update Mobile Response :: ", response);
	} catch (error) {
		console.log("Error while updating mobile :: ", error);
	}
};

export default updateMobile;
