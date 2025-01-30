import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const randomImagesTheory2 = async (data) => {
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/saveRandomImageWeb`,
      data,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Random Image theory2 response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while send Random Image theory2:: ", error);
    throw error;
  }
};

export default randomImagesTheory2;
