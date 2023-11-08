import {useContext, useEffect, useState} from "react";
import {Context} from "../context/Context";
import axios from "axios";
import {PostDetails} from "../components/FavoritePostList/PostDetails";
import {NeighborPost} from "../components/neighbor/NeighborPost";

export const MyNeighborPostList = () => {
	const {getHeaders} = useContext(Context);

	const [posts, setPosts] = useState([])

	useEffect(() => {

		const getPosts = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/neighbor/post/my`, {headers});

			setPosts(res.data.result.posts);
		}

		getPosts()
	}, [])

	return (
		<div className="container mt-lg-5">
			<h1 className="mb-4">내 판매글 목록</h1>
			<ul className="list-group">
				{posts.map((post) => (
					<li key={post.id} className="list-group-item">
						<NeighborPost
							post={post}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}