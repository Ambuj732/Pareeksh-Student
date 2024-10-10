import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const hackthonStudentDashboardStatistics = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/hackathonInfo?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Hackthon Student Dashboard Statistics response :: ", response);
    return response;
  } catch (error) {
    console.log(
      "Error while Hackthon Student Dashboard Statistics in :: ",
      error
    );
    throw error;
  }
};

export default hackthonStudentDashboardStatistics;
