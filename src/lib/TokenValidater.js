import axios from "axios";
import {useContext} from "react";
import {Context} from "../context/Context";

export async function TokenValidater() {
	const {getHeaders} = useContext(Context)

	try {
		const headers = getHeaders();
		console.log("try block")
		const res = await axios.get(`${process.env.REACT_APP_url}/api/user/validate-token`, headers)

		return true;
	}
	catch (err) {
		console.log("catch block")

		return false;
	}
}