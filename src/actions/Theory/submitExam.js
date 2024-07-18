import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const SubmitExam = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
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
    console.log("Submit Exam response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Submit Exam in :: ", error);
    throw error;
  }
};

export default SubmitExam;
