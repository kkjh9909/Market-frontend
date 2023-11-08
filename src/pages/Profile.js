import {useContext, useEffect, useState} from "react";
import {Context} from "../context/Context";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import React from "react";
import {ImageUploader} from "../lib/ImageUploader";

export const Profile = () => {

	const {getHeaders} = useContext(Context);

	const [modalIsOpen, setModalIsOpen] = useState(false);

	const [image, setImage] = useState("");
	const [editImage, setEditImage] = useState("");

	const [nickname, setNickname] = useState("");
	const [editNickname, setEditNickname] = useState("");

	const [address, setAddress] = useState("");
	const [editAddress, setEditAddress] = useState("");

	const regions = [
		{ value: '서울', label: '서울특별시' },
		{ value: '부산', label: '부산광역시' },
		{ value: '대구', label: '대구광역시' },
		{ value: '인천', label: '인천광역시' },
		{ value: '광주', label: '광주광역시' },
		{ value: '대전', label: '대전광역시' },
		{ value: '울산', label: '울산광역시' },
	]

	const handleOptionChange = (e) => {
		const selected = e.target.value;

		console.log(selected)

		setEditAddress(selected);

	};

	const nav = useNavigate();

	useEffect(() => {

		const getProfile = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/user/profile`, {headers});
			console.log(res)
			setImage(res.data.result.image);
			setNickname(res.data.result.nickname)
			setAddress(res.data.result.address)
		}

		getProfile();
	}, [])

	const navChatList = () => {
		nav('chatrooms')
	}

	const navFavoriteList = () => {
		nav('favorites')
	}

	const navPostList = () => {
		nav('posts')
	}

	const customStyles = {
		content: {
			width: '50%', // 모달의 가로 크기
			height: '50%', // 모달의 세로 크기
			margin: 'auto', // 모달을 가운데 정렬
		}
	};

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];

		const image = await ImageUploader(file);

		setEditImage(image);
	}

	const changeProfile = async () => {
		const headers = getHeaders();
		const res = await axios.put(`${process.env.REACT_APP_url}/api/user/profile`, {
			"nickname": editNickname,
			"address": editAddress,
			"image": editImage
		}, {
			headers: headers
		});

		setNickname(res.data.result.nickname);
		setAddress(res.data.result.address);
		setImage(res.data.result.image);

		setModalIsOpen(false);
	}

	return (
		<div className="container mt-lg-5 border">
			<div style={{position: "relative"}}>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					style={customStyles}
					overlayClassName="modal-overlay"
				>
					<h3>프로필 수정</h3>
					<div className="row mt-lg-3">
						<label htmlFor="nickname" className="form-label">닉네임</label>
						<div className="col">
							<input
								type="text"
								className="form-control"
								id="username"
								value={editNickname}
								onChange={e => setEditNickname(e.target.value)}
							/>
						</div>
					</div>
					<div className="col mt-3">
						<label htmlFor="지역" className="form-label">지역</label>
						<select
							className="form-control w-100"
							id="selectOption"
							value={address}
							onChange={handleOptionChange}
						>
							{regions.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
					<div className="mt-lg-3">
						<label htmlFor="image" className="form-label">프로필 이미지</label>
						<input
							type="file"
							className="form-control"
							accept="image/*" // 이미지 파일만 업로드 허용
							onChange={handleImageUpload} // 파일 선택 시 호출되는 함수
						/>
						<img
							src={editImage}
							alt="미리보기 이미지"
							style={{ width: "100px", height: "100px" }}
						/>
					</div>
					<div style={{position: "absolute", bottom: "0", right: "0", margin: "20px"}}>
						<button className="btn btn-primary" onClick={changeProfile}>저장</button>
						<button className="btn btn-warning ms-2" onClick={() => setModalIsOpen(false)}>닫기</button>
					</div>
				</Modal>
			</div>
			<div className="row">
				<div className="col-auto">
					<img src={`${image}`} style={{height: "80px", width: "80px"}}/>
				</div>
				<div className="col text-start">
					<div className="row m-auto">
						<div className="col">
							<h2>{nickname}</h2>
						</div>
						<div>
							<h3 style={{color: "#a9a9a9"}}>{address}</h3>
						</div>
					</div>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100" onClick={() => setModalIsOpen(true)}>프로필 수정</button>
				</div>
				<div className="text-start mt-lg-5">
					<h1>중고 거래</h1>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100" onClick={navFavoriteList}>내 관심글 목록</button>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100" onClick={navPostList}>내 판매글 목록</button>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100" onClick={navChatList}>내 채팅 목록</button>
				</div>
				<div className="text-start mt-lg-5">
					<h1>일상</h1>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100">내 일상글/댓글 목록</button>
				</div>
			</div>
		</div>
	)
}