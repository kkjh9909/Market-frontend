import {Button, ButtonGroup} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../context/Context";
import {NeighborPost} from "../components/neighbor/NeighborPost";
import {useNavigate} from "react-router-dom";

export const Neighborhood = () => {

	const {getHeaders} = useContext(Context)
	const nav = useNavigate();

	const topics = [
		"인기", "일상", "동네질문", "생활정보", "취미생활"
	]

	const [page, setPage] = useState(0);

	const [clickedTopic, setClickedTopic] = useState(topics[0]);
	const [posts, setPosts] = useState([]);


	useEffect(() => {
		const headers = getHeaders();


		const getPosts = async () => {
			const res = await axios.get(`${process.env.REACT_APP_url}/api/neighbor/post/list?category=${clickedTopic}&page=${page}`, {
				headers
			});

			setPosts(res.data.result.posts);
		}

		getPosts();
	}, [clickedTopic, page])

	const handleTopic = (topic) => {
		setClickedTopic(topic);
		setPage(0);
	}

	return (
		<div className="container mt-lg-5">
			<div className="w-100">
				<ButtonGroup variant="outlined" aria-label="outlined button group" fullWidth>
					{
						topics.map(topic => (
							<Button
								onClick={() => handleTopic(topic)}
								key={topic}
								variant={clickedTopic === topic ? "contained" : "outlined"}
							>{topic}</Button>
						))
					}
				</ButtonGroup>
				<div className="text-end mt-2">
					<div>
						<button className="btn btn-success" onClick={() => nav(`write`)}>글 쓰기</button>
					</div>
				</div>
				{
					posts.length > 0 ? (
						posts.map(post => (
							<NeighborPost
								post={post}
							/>
						))
					) : (
						<>게시글이 없어요</>
					)
				}
			</div>
		</div>
	)
}