import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getSpecialization = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchSpecialization?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Login response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while logging in :: ", error);
		throw error;
	}
};

export default getSpecialization;
