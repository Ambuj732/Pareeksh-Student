import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getPlatforms = async () => {
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/amsapi/masterData/fetchPlatforms`,
			{},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		);
		console.log("Get Platforms Response :: ", response);
		return response;
	} catch (error) {
		console.log("Error while getting platforms :: ", error);
	}
};

export default getPlatforms;
