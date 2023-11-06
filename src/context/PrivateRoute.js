import React, {useContext, useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import cookie from "react-cookies";
import axios from "axios";
import {Context} from "./Context";

function PrivateRoute ({component: Component}) {
	const [isValidate, setIsValidate] = useState(2);

	const {getHeaders} = useContext(Context);

	useEffect(() => {
		const validateToken = async () => {
			try {
				const headers = getHeaders()

				const res = await axios.get(`${process.env.REACT_APP_url}/api/user/validate-token`, {
					headers: headers
				});

				setIsValidate(1);
			}
			catch(err) {
				setIsValidate(0);
			}
		}

		validateToken();
	}, [])

	if(isValidate === 1) {
		return Component
	}
	else if(isValidate === 0) {
		alert("로그인이 필요합니다.");
		const msg = window.confirm("로그인 하시겠습니까?");
		if (msg === true)
			return <Navigate to="/login" />;
		else
			return <Navigate to="/home" />;
	}
	else {
		return (
			<div style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
				<img src={"/loading800.gif"} alt="로딩중" />
			</div>
		)
	}
}

export default PrivateRoute;