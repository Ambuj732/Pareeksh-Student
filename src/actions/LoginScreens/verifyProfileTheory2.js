import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const verifyProfileTheory2 = async (
  formdata,
  geoAddress,
  latlong,
  exam_id,
  userData
) => {
  console.log(userData);
  try {
    const response = await axios.post(
      `${PUBLIC_REST_API_ENDPOINT}/amsapi/exam/theorySecond/verifyStudentWeb`,
      {
        usercode: userData["usercode"],
        user_id: userData["userid"],
        sub_user_id: userData["subuserid"],
        student_id: userData["id"],
        name: encodeURIComponent(formdata.nameFormControl),
        gender: encodeURIComponent(formdata.genderFormControl),
        email_id: encodeURIComponent(formdata.emailFormControl),
        mobile_numb: encodeURIComponent(formdata.mobileFormControl),
        high_qual: encodeURIComponent(formdata.qualiFormControl),
        aadhar_numb: encodeURIComponent(formdata.aadharFormControl),
        id_state: encodeURIComponent(formdata.state),
        id_city: encodeURIComponent(formdata.district),
        address: geoAddress,
        latlng: latlong,
        exam_id: exam_id,
        date_of_birth: encodeURIComponent(formdata.birthdateFormControl),
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error while verifying theory2 studnet :: ", error);
  }
};

export default verifyProfileTheory2;
