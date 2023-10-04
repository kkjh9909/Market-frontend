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
	const {getHeaders, calculateDate, formatPrice} = useContext(Context);
	const nav = useNavigate();

	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(0);
	const [isMine, setIsMine] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const [likes, setLikes] = useState(0);

	const [post, setPost] = useState({});
	const [user, setUser] = useState({});
	const [relatedPosts, setRelatedPosts] = useState({});

	useEffect(() => {
		
		const getPost = async () => {
			window.scrollTo(0, 0);

			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/${location.state.postId}`, {
				headers: headers
			});
			
			setPrice(res.data.result.post_info.price);
			setImages(res.data.result.post_info.images);
			setIsMine(res.data.result.user_info.my_post);
			setIsLike(res.data.result.user_info.is_like);
			setLikes(res.data.result.post_info.favorite_count);

			setPost(res.data.result.post_info);
			setUser(res.data.result.user_info);

			return res.data.result.post_info.category;
		}

		const getRelated = async (category) => {
			const res2 = await axios.get(`${process.env.REACT_APP_url}/api/product/post/list/${category}`);

			setRelatedPosts(res2.data.result.post_info);
		}

		getPost().then(category => getRelated(category))

	}, [location.state])

	const handleLike = async () => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/product/like/${location.state.postId}`, null, {
			headers: headers
		});

		setIsLike(true);
		setLikes(res.data.result.favorite_count)
	}

	const handleDislike = async () => {
		const headers = getHeaders();

		const res = await axios.delete(`${process.env.REACT_APP_url}/api/product/like/${location.state.postId}`, {
			headers: headers
		});

		setIsLike(false);
		setLikes(res.data.result.favorite_count)
	}

	const handleChatting = async () => {
		const headers = getHeaders();

		const res = await axios.get(`${process.env.REACT_APP_url}/api/chatroom?postId=${location.state.postId}&receiverId=${user.id}`, {
			headers: headers
		});

		nav(`/chat/${res.data.result.chatroom_number}`, { state: { room_id: res.data.result.chatroom_number, my_id: res.data.result.my_id } })
	}

	const handleEdit = () => {
		nav('edit', {state: {postId: location.state.postId}});
	}

	const handleDelete = async () => {
		const headers = getHeaders();

		const res = await axios.delete(`${process.env.REACT_APP_url}/api/product/post/${location.state.postId}/delete`, {
			headers: headers
		});

		nav('/flea');
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
									<button className="col btn btn-warning" onClick={handleEdit}>수정하기</button>
									<button className="col btn btn-danger ms-2" onClick={handleDelete}>삭제하기</button>
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