import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const randomImages = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/psyc/saveRandomImageWeb`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Random Images response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Random Images in :: ", error);
    throw error;
  }
};

export default randomImages;
