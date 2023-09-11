import {useNavigate} from "react-router-dom";

export const PostCard = ({ posts }) => {

	const nav = useNavigate();

	return (
		<div className="row">
			{posts.map((post) => (
				<div className="card col-4" key={post.id}>
					<img src="/logo192.png" style={{ height: "20vh" }} alt={post.title} />
					<div className="card-body text-start">
						<h5 className="card-title">{post.title}</h5>
						<p className="card-text">
							{post.price}원
						</p>
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
			))}
		</div>
	);
};
