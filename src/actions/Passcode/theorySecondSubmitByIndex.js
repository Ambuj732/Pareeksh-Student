import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const theorySecondSubmitByIndex = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/submitByQuesIndexWeb?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Submit answer by index response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while submitting answer by index :: ", error);
		throw error;
	}
};

export default theorySecondSubmitByIndex;
