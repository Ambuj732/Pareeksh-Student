import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getCorporateStage = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getCorporateStage`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Get Corporate Stage Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting corporate stage :: ", error);
	}
};

export default getCorporateStage;
