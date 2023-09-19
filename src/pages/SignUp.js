import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const SignUp = () => {

	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');
	const [nickname, setNickname] = useState('');
	const [username, setUsername] = useState('');
	const [address, setAddress] = useState('서울');
	const [profileImage, setProfileImage] = useState('');

	const navigate = useNavigate();

	const regions = [
		{ value: '서울', label: '서울특별시' },
		{ value: '부산', label: '부산광역시' },
		{ value: '대구', label: '대구광역시' },
		{ value: '인천', label: '인천광역시' },
		{ value: '광주', label: '광주광역시' },
		{ value: '대전', label: '대전광역시' },
		{ value: '울산', label: '울산광역시' },
	]

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];

		const formData = new FormData();
		formData.append('file', file);

		const res = await axios.post(`${process.env.REACT_APP_url}/images/upload`, formData)

		setProfileImage(res.data.image_url);
	}

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

	const handleOptionChange = (e) => {
		const selected = e.target.value;

		console.log(selected)

		setAddress(selected);

	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card bg-light">
						<div className="card-body">
							<h3 className="card-title text-center mb-4">회원가입</h3>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">프로필 이미지</label>
								<input
									type="file"
									className="form-control"
									accept="image/*" // 이미지 파일만 업로드 허용
									onChange={handleImageUpload} // 파일 선택 시 호출되는 함수
								/>
							</div>
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
								<div className="col">
									<label htmlFor="username" className="form-label">지역</label>
									<select
										className="form-control w-100"
										id="selectOption"
										value={address}
										defaultValue="seoul"
										onChange={handleOptionChange}
									>
										{regions.map(option => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
								</div>
								<button type="button" className="btn btn-primary btn-block mt-lg-5" onClick={handleSignUp}>회원가입</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}