import {useContext, useEffect, useState} from "react";
import {Context} from "../context/Context";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const Profile = () => {

	const {getHeaders} = useContext(Context);
	const [profile, setProfile] = useState({});

	const nav = useNavigate();

	useEffect(() => {

		const getProfile = async () => {
			const headers = getHeaders();

			console.log(headers)
			const res = await axios.get(`${process.env.REACT_APP_url}/api/user/profile`, {headers});
			setProfile(res.data.result);

			console.log(res.data)
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

	return (
		<div className="container mt-lg-5 border">
			<div className="row">
				<div className="col-auto">
					<img src={`${profile.image}`} style={{height: "80px", width: "80px"}}/>
				</div>
				<div className="col text-start">
					<div className="m-auto">
						<h2>{profile.nickname}</h2>
					</div>
				</div>
				<div className="mt-lg-2">
					<button className="btn btn-light w-100">프로필 수정</button>
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