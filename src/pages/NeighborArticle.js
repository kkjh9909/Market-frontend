import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {Context} from "../context/Context";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {CommentList} from "../components/neighbor/CommentList";

export const NeighborArticle = () => {

	const location = useLocation();
	const {getHeaders, calculateDate, formatPrice} = useContext(Context);
	const nav = useNavigate();

	const [images, setImages] = useState([]);
	const [isMine, setIsMine] = useState(false);
	const [isLike, setIsLike] = useState(false);
	const [likes, setLikes] = useState(0);

	const [post, setPost] = useState({});
	const [user, setUser] = useState({});
	const [comments, setComments] = useState([])

	useEffect(() => {
		const getPost = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/neighbor/post/${location.state.postId}`, {headers})

			console.log(res)

			setImages(res.data.result.post_info.images);
			setIsMine(res.data.result.user_info.my_post);
			setIsLike(res.data.result.user_info.is_like);
			setLikes(res.data.result.post_info.like_count);

			setPost(res.data.result.post_info);
			setUser(res.data.result.user_info);
		}

		getPost();
	}, [location.state.postId])

	useEffect(() => {
		const getComments = async () => {
			const res = await axios.get(`${process.env.REACT_APP_url}/api/neighbor/comment/${location.state.postId}/list`)

			console.log(res)

			setComments(res.data.result.comments);
		}

		getComments();
	}, [])

	function handleEdit() {

	}

	function handleDelete() {

	}

	const handleDislike = async () => {
		const headers = getHeaders();

		const res = await axios.delete(`${process.env.REACT_APP_url}/api/neighbor/post/like/${location.state.postId}`, {
			headers: headers
		});

		setLikes(res.data.result.like_count)
		setIsLike(false)
	}

	const handleLike = async () => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/neighbor/post/like/${location.state.postId}`, null, {
			headers: headers
		});

		setLikes(res.data.result.like_count)
		setIsLike(true)
	}

	return (
		<div className="container mt-lg-5">
			<div className="text-start">
				<h4>{post.title}</h4>
				<p className="mt-lg-5 mb-lg-5">{post.content}</p>
				<p style={{color: '#868E96'}}>{post.category} ∙ {calculateDate(new Date(post.created_time))}</p>
				<p style={{color: '#868E96'}}>좋아요 {likes} ∙ 조회 {post.hit_count}</p>
				<div className="row">
					<div className="col">
						{
							isLike ? (
								<button
									className="btn"
									onClick={handleDislike}
								><ThumbUpAltIcon fontSize="large"/></button>
							) : (
								<button
									className="btn"
									onClick={handleLike}
								><ThumbUpOffAltIcon fontSize="large"/></button>
							)
						}
					</div>
				</div>
			</div>
			<hr />
			<div>
				{
					images.map(image => (
						<img src={image} />
					))
				}
			</div>
			<hr />
			<div className="text-start">
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
			</div>
			<hr />
			<CommentList
				comments={comments}
				setComments={setComments}
			/>
		</div>
	)
}
