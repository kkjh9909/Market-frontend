import {useContext, useEffect, useState} from "react";
import {Context} from "../context/Context";
import axios from "axios";
import {PostDetails} from "../components/FavoritePostList/PostDetails";

export const FavoritePostList = () => {
	const {getHeaders} = useContext(Context);

	const [posts, setPosts] = useState([])

	useEffect(() => {

		const getPosts = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/like/posts`, {headers});

			console.log(res.data.result.posts)
			setPosts(res.data.result.posts);
		}

		getPosts()
	}, [])

	return (
		<div className="container mt-lg-5">
			<h1 className="mb-4">채팅방 목록</h1>
			<ul className="list-group">
				{posts.map((post) => (
					<li key={post.id} className="list-group-item">
						<PostDetails
							details={post}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}