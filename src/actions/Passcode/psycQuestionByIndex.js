import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const getTheorySecondExamInitial = async (data) => {
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
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/psyc/questionByIndex?${queryString}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Psyc Question By Index response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while Psyc Question By Index in :: ", error);
		throw error;
	}
};

export default getTheorySecondExamInitial;
