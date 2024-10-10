import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

// url worng hai main api pe
const theorySecondFinalSubmit = async (data) => {
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
		console.log("Auto Submit Exam response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Submit Examl in :: ", error);
		throw error;
	}
};

export default theorySecondFinalSubmit;
