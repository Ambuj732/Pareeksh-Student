import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

// url worng hai main api pe
const psycFinalSubmit = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/examSubmitWeb?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Psyc Final Submit response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Psyc Final Submit :: ", error);
		throw error;
	}
};

export default psycFinalSubmit;
