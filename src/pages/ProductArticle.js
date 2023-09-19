import {useContext, useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {useLocation, useNavigate} from "react-router-dom";
import ImageSlider from "../components/post/ImageSlider";
import {PostCard} from "../components/post/PostCard/PostCard";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Context} from "../context/Context";

export const ProductArticle = () => {

	const location = useLocation();
	const {getHeaders} = useContext(Context);
	const nav = useNavigate();

	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(0);
	const [isMine, setIsMine] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const [likes, setLikes] = useState(0);

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
			window.scrollTo(0, 0);

			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/${location.state.postId}`, {
				headers: headers
			});
			
			setPrice(res.data.post_info.price);
			setImages(res.data.post_info.images);
			setIsMine(res.data.post_info.my_post);
			setIsLike(res.data.post_info.is_like);
			setLikes(res.data.post_info.favorite_count);

			setPost(res.data.post_info);
			setUser(res.data.user_info);

			return res.data.post_info.category;
		}

		const getRelated = async (category) => {
			const res2 = await axios.get(`${process.env.REACT_APP_url}/api/product/post/list/${category}`);

			setRelatedPosts(res2.data.post_info);
		}

		getPost().then(category => getRelated(category))

	}, [location.state])

	const handleLike = async () => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/product/like/${location.state.postId}`, null, {
			headers: headers
		});

		setIsLike(true);
		setLikes(res.data.favorite_count)
	}

	const handleDislike = async () => {
		const headers = getHeaders();

		const res = await axios.delete(`${process.env.REACT_APP_url}/api/product/like/${location.state.postId}`, {
			headers: headers
		});

		setIsLike(false);
		setLikes(res.data.favorite_count)
	}

	const handleChatting = async () => {
		const headers = getHeaders();

		const res = await axios.get(`${process.env.REACT_APP_url}/api/chatroom?postId=${location.state.postId}&receiverId=${user.id}`, {
			headers: headers
		});

		nav(`/chat/${res.data.chatroom_number}`, { state: { room_id: res.data.chatroom_number, my_id: res.data.my_id } })
	}

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
						{
							isMine ? (
								<div className="row w-25">
									<button className="col btn btn-warning">수정하기</button>
									<button className="col btn btn-danger ms-2">삭제하기</button>
								</div>
							) : (
								<div></div>	
							)
						}
					</div>
				</div>
				<hr/>
				<div>
					<h4>{post.title}</h4>
					<p style={{color: '#868E96'}}>{post.category} ∙ {calculateDate(new Date(post.created_time))}</p>
					<strong>{formatPrice(price)}원</strong>
					<p className="mt-lg-5 mb-lg-5">{post.content}</p>
					<p style={{color: '#868E96'}}>관심{likes} ∙ 채팅{post.chatroom_count} ∙ 조회{post.hit_count}</p>
					<div className="row">
						<div className="col">
						{
							isLike ? (
								<button
									className="btn"
									onClick={handleDislike}
								><FavoriteIcon fontSize="large"/></button>
							) : (
								<button
									className="btn"
									onClick={handleLike}
								><FavoriteBorderIcon fontSize="large"/></button>
							)
						}
						</div>
						<div className="col-auto">
							<button className="btn btn-success" onClick={handleChatting}>채팅걸기</button>
						</div>
					</div>
				</div>
				<hr/>
				<h3 className="mt-lg-5 mb-lg-5">{post.category} 관련글 </h3>
				<PostCard posts = {relatedPosts}/>
			</div>
		</div>
	)
}