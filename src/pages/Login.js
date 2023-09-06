import React, {useState} from 'react';
import axios from "axios";
import cookie from "react-cookies";
import {useNavigate} from "react-router-dom";

export const Login = () => {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const setCookies = (token) => {
		const expires = new Date()
		expires.setMinutes(expires.getMinutes() + 60)
		cookie.save('access_token', token, {
			path : '/',
			expires,
		});
	}

	const handleLogin = async () => {
		console.log('Username:', userId);
		console.log('Password:', password);

		const res = await axios.post(`${process.env.REACT_APP_url}/api/user/signin`, {
			"userId": userId,
			"password": password
		});

		setCookies(res.data.access_token);

		console.log("성공");

		// const address = await axios.get(`${process.env.REACT_APP_url}/api/user/address`, {
		// 	headers: {
		// 		"Authorization": "Bearer " + cookie.load("access_token")
		// 	}
		// });

		navigate("/home");
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card bg-light">
						<div className="card-body">
							<h3 className="card-title text-center mb-4">환영합니다!</h3>
							<form>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">사용자명</label>
									<input
										type="text"
										className="form-control"
										id="username"
										value={userId}
										onChange={e => setUserId(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">비밀번호</label>
									<input
										type="password"
										className="form-control"
										id="password"
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
								</div>
								<button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>로그인</button>
								<div className="text-center mt-3">
									<a href="#">비밀번호를 잊으셨나요?</a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}