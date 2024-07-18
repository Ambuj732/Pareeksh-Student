import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const theorySecondStudentLog = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/log?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Theory Second Student Log response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Theory Second Student Log :: ", error);
		throw error;
	}
};

export default theorySecondStudentLog;
