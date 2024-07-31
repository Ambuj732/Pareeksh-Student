import { PUBLIC_REST_API_ENDPOINT, BEARER_TOKEN } from "../../constants";
import axios from "axios";

const verifyProfilePsychometric = async (formdata,geoAddress,latlong,exam_id,userData) => {
	console.log(userData);
	try {
		const response = await axios.post(
			`${PUBLIC_REST_API_ENDPOINT}/exam/psyc/verifyStudent`,
			{
				usercode: userData['usercode'],
				user_id: userData['userid'],
				sub_user_id: userData['subuserid'],
				id_student: userData['id'],
				student_name:encodeURIComponent(formdata.nameFormControl), 
				gender:encodeURIComponent(formdata.genderFormControl), 
				email_id: encodeURIComponent(formdata.emailFormControl), 
				mobile: encodeURIComponent(formdata.mobileFormControl), 
				id_hq: encodeURIComponent(formdata.qualiFormControl), 
				aadhar_numb: encodeURIComponent(formdata.aadharFormControl), 
				id_state: encodeURIComponent(formdata.state), 
				id_city: encodeURIComponent(formdata.district), 
				address: geoAddress, 
				latlng: latlong, 
				exam_id: exam_id, 
				date_of_birth: encodeURIComponent(formdata.birthdateFormControl)
			},
			{
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
				},
			}
		)	
		return response;
	} catch (error) {
		console.log("Error while fetching student details :: ", error)
	}
}

export default verifyProfilePsychometric;


