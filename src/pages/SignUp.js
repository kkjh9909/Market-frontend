import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const SignUp = () => {

	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [nickname, setNickname] = useState('');
	const [username, setUsername] = useState('');
	const [address, setAddress] = useState('');
	const [profileImage, setProfileImage] = useState('');

	const navigate = useNavigate();

	const handleSignUp = async () => {
		const res = await axios.post(`${process.env.REACT_APP_url}/api/user/signup`, {
			"userId": userId,
			"password": password,
			"username": username,
			"nickname": nickname,
			"profileImage": profileImage,
			"address": address,
		});

		navigate("/login");
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card bg-light">
						<div className="card-body">
							<h3 className="card-title text-center mb-4">회원가입</h3>
							<form>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">아이디</label>
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
								<div className="mb-3">
									<label htmlFor="username" className="form-label">사용자명</label>
									<input
										type="text"
										className="form-control"
										id="username"
										value={username}
										onChange={e => setUsername(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">닉네임</label>
									<input
										type="text"
										className="form-control"
										id="username"
										value={nickname}
										onChange={e => setNickname(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="username" className="form-label">주소</label>
									<input
										type="text"
										className="form-control"
										id="username"
										value={address}
										onChange={e => setAddress(e.target.value)}
									/>
								</div>
								<button type="button" className="btn btn-primary btn-block" onClick={handleSignUp}>회원가입</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}