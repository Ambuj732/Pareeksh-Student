import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const multiObjectDetectionWebTheory2 = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/multiobjectweb?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Multi Object Detection theory2 response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Multi Object Detection theory2 :: ", error);
    throw error;
  }
};

export default multiObjectDetectionWebTheory2;
