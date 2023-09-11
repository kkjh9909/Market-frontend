import {useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {useLocation} from "react-router-dom";
import ImageSlider from "../components/post/ImageSlider";

export const ProductArticle = () => {

	const location = useLocation();
	const postId = location.state;

	const [images, setImages] = useState([]);

	const [nickname, setNickname] = useState('');
	const [address, setAddress] = useState('');

	const [title, setTitle] = useState('');
	const [category, setCategory] = useState('');
	const [time, setTime] = useState(0);

	const [content, setContent] = useState('');
	const [hits, setHits] = useState(0);
	const [favorites, setFavorites] = useState(0);
	const [chatrooms, setChatrooms] = useState(0);

	useEffect(() => {
		
		async function getPost() {
			const headers = {};

			const access_token = cookie.load("access_token");
			if (access_token) {
				headers["Authorization"] = `Bearer ${access_token}`;
			}

			console.log(location)

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/${location.state.postId}`, {
				headers: headers
			});

			setTitle(res.data.post_info.title);
			setCategory(res.data.post_info.category);
			setContent(res.data.post_info.created_time);
			setHits(res.data.post_info.hit_count);
			setChatrooms(res.data.post_info.chatroom_count);
			setFavorites(res.data.post_info.favorite_count);

			setNickname(res.data.user_info.nickname);
			setAddress(res.data.user_info.address);

			setImages(res.data.post_info.images);
		}

		getPost();

	}, [])

	return (
		<div className="container mt-lg-5">
			<div className="text-start">
				<ImageSlider images={images} />
				<hr/>
				<p>닉네임 {nickname}</p>
				<p>주소 {address}</p>
				<hr/>
				<div>
					<h4>{title}</h4>
					<p>{category}, {time}</p>
					<p>{content}</p>
					<p>관심{favorites} 채팅{chatrooms} 조회{hits}</p>
				</div>
				<hr/>
			</div>
		</div>
	)
}