import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getDiffLevel = async () => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/corporate/getDifficultyLevel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Difficulty Level response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting Difficulty Level  :: ", error);
  }
};

export default getDiffLevel;
