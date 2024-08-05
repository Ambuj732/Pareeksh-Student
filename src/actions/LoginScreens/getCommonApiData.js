import axios from "axios";
import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";

const getCommonApiData = async (pathname) => {

  try {
    const user = JSON.parse(localStorage.getItem("ps_loguser"));
    const data = {
        usercode: user?.usercode,
        id_self_student: user?.id_self_student,
    }
    const queryString = Object.keys(data)
    .map(
        (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
                data[key]
            )}`
    )
    .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/${pathname}?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Highest Qualification response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while getting highest qualification :: ", error);
  }
};

export default getCommonApiData;
