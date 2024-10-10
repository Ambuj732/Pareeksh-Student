import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getCorporateSize = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getCorporateSize`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Get Corporate Size Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting corporate size :: ", error);
	}
};

export default getCorporateSize;
