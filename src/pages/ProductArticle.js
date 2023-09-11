import {useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {useLocation} from "react-router-dom";
import ImageSlider from "../components/post/ImageSlider";
import {PostCard} from "../components/post/PostCard/PostCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const ProductArticle = () => {

	const location = useLocation();

	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(0);

	const [post, setPost] = useState({});
	const [user, setUser] = useState({});
	const [relatedPosts, setRelatedPosts] = useState({});

	const calculateDate = (date) => {
		const milliSeconds = new Date() - date;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	}

	function formatPrice(price) {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}


	useEffect(() => {
		
		const getPost = async () => {
			const headers = {};

			const access_token = cookie.load("access_token");
			if (access_token) {
				headers["Authorization"] = `Bearer ${access_token}`;
			}

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/${location.state.postId}`, {
				headers: headers
			});

			setPrice(res.data.post_info.price);
			setImages(res.data.post_info.images);

			setPost(res.data.post_info);
			setUser(res.data.user_info);

			return res.data.post_info.category;
		}

		const getRelated = async (category) => {
			const res2 = await axios.get(`${process.env.REACT_APP_url}/api/product/post/list/${category}`);

			console.log(res2)

			setRelatedPosts(res2.data.post_info);
		}

		getPost().then(category => getRelated(category))

	}, [location.state])

	return (
		<div className="container mt-lg-5">
			<div className="text-start">
				<ImageSlider images={images} />
				<hr/>
				<div className="row">
					<div className="col-auto">
						<img src={user.profile} style={{borderRadius: '50%'}}/>
					</div>
					<div className="col">
						<strong>{user.nickname}</strong>
						<p>{user.address}</p>
					</div>
				</div>
				<hr/>
				<div>
					<h4>{post.title}</h4>
					<p style={{color: '#868E96'}}>{post.category} ∙ {calculateDate(new Date(post.created_time))}</p>
					<strong>{formatPrice(price)}원</strong>
					<p className="mt-lg-5 mb-lg-5">{post.content}</p>
					<p style={{color: '#868E96'}}>관심{post.favorite_count} ∙ 채팅{post.chatroom_count} ∙ 조회{post.hit_count}</p>
				</div>
				<hr/>
				<h3 className="mt-lg-5 mb-lg-5">{post.category} 관련글 </h3>
				<PostCard posts = {relatedPosts}/>
			</div>
		</div>
	)
}