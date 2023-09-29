import cookie from "react-cookies";
import axios from "axios";

export const ImageUploader = async (file) => {
	const formData = new FormData();
	formData.append("file", file);

	const res = await axios.post(
		`${process.env.REACT_APP_url}/images/upload`,
		formData,
		{
			headers: {
				Authorization: "Bearer " + cookie.load("access_token"),
			},
		}
	);

	return res.data.image_url;
}