import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

// const data = {
//   usercode: user?.usercode,
//   id_self_student: user?.id_self_student,
//   id_qp: "402",
// };

const dashboardExamList = async (data) => {
  try {
    const queryString = Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/studentSelf/fetchDashboardExamList?${queryString}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log("Dashboard Exam List response :: ", response);
    return response;
  } catch (error) {
    console.log("Error while Dashboard Exam List in :: ", error);
    throw error;
  }
};

export default dashboardExamList;
