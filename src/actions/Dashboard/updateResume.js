import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";


const updateResume = async (data , formData) => {
	try {
		const queryString = Object.keys(data)
			.map(
				(key) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(
						data[key]
					)}`
			)
			.join("&");
			console.log(queryString)
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/updatePersonal?${queryString}`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		
		console.log("Update Personal Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while updating personal :: ", error);
	}
};

export default updateResume;