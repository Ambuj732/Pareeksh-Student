import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const passcodeVerifyOtp = async (data) => {
  try {
    console.log("hi");
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/student/loginOtp?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("hi");
    return response;
  } catch (error) {
    console.log("Error while verifying otp :: ", error);
  }
};

export default passcodeVerifyOtp;
