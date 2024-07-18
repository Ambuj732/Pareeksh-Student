import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const autoExamInitial = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/getRandomizeExam?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Auto Exam Initial response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Auto Exam Initial in :: ", error);
    throw error;
  }
};

export default autoExamInitial;
