import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {Context} from "../../../context/Context";

export const PostCard = ({ posts }) => {

	const {formatPrice} = useContext(Context);
	const nav = useNavigate();

	return (
		<div className="row">
			{posts.length > 0 ? posts.map((post) => (
				<div className="card col-4" key={post.id}>
					<img src={`${post.thumbnail}`} style={{ height: "20vh" }} alt={post.title} />
					<div className="card-body text-start">
						<h5 className="card-title">{post.title}</h5>
						<strong className="card-text">
							{formatPrice(post.price)}원
						</strong>
						<p className="card-text">
							{post.address}
						</p>
						<p className="card-text">
							관심{post.favorite_count}, 채팅{post.chatroom_count}
						</p>
						<button className="btn btn-primary w-100"
								onClick={() => nav(`/product/${post.id}`, { state: { postId: post.id } })}
						>
							물건 보러 가기
						</button>
					</div>
				</div>
			)) : (
				<div><h1>연관 게시물이 존재하지 않아요</h1></div>
			)}
		</div>
	);
};
