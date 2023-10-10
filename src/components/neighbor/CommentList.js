import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useContext, useState} from "react";
import {Context} from "../../context/Context";
import {Reply} from "./Reply";
import axios from "axios";
import {useParams} from "react-router-dom";

export const CommentList = ({comments, setComments}) => {

	const { postId } = useParams();
	const {getHeaders, monthDayTime} = useContext(Context);

	const [content, setContent] = useState("");
	const [writeReply, setWriteReply] = useState(Array(comments.length).fill(false)); // 각 댓글에 대한 writeReply 상태 배열


	const handleWriting = (e) => {
		setContent(e.target.value);
	}

	const submitComment = async (id) => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/neighbor/comment/${postId}/write`, {
			"content": content
		}, {headers});

		setComments([...comments, res.data.result.comment])
	}

	const submitReply = async (id, index) => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/neighbor/comment/${postId}/write`, {
			"content": content,
			"parentId": id
		}, {headers});

		const newReply = res.data.result.comment;

		console.log(index);
		const newComments = [...comments];
		newComments[index].replies.push(newReply);

		setComments(newComments);

		const newWriteReply = [...writeReply];
		newWriteReply[index] = false;
		setWriteReply(newWriteReply);
	}

	const toggleWriteReply = (index) => {
		const newWriteReply = [...writeReply];
		newWriteReply[index] = !newWriteReply[index];
		setWriteReply(newWriteReply);
	};

	return (
		<div className="text-start mt-3">
			<div className="ms-2">
				<h3>댓글</h3>
			</div>
			{
				comments.length > 0 ? comments.map((comment, index) => (
						<div key={comment.id}>
							<div className="mt-3">
								<div className="row">
									<div className="col-auto">
										<img src={comment.profile} className="img-thumbnail"/>
									</div>
									<div className="col border p-3">
										<h3>{comment.nickname}</h3>
										<p>{comment.content}</p>
										<div className="row align-items-center">
											<div className="col-auto">
												<p>{monthDayTime(comment.created_time)}</p>
											</div>
											<div className="col-auto">
												<p>
													<button className="btn"><ThumbUpAltIcon/></button>
													{comment.like_count}</p>
											</div>
											<div className="row">
												<div className="col-auto">
													<button className="btn"  onClick={() => toggleWriteReply(index)}>답글</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							{
								comment.replies.length > 0 ? comment.replies.map(reply => (
									<Reply
										reply={reply}
										index={index}
										toggleWriteReply={toggleWriteReply}
									/>
								)) : (
									<></>
								)
							}
							{
								writeReply[index] ? (
									<div className={`row mt-3 ${comment.replies.length > 0 ? " ms-lg-5" : ""}`}>
										<div className="col">
											<input
												placeholder="답글 작성하기"
												className="form-control w-100"
												value={content}
												onChange={handleWriting}
											/>
										</div>
										<div className="col-auto">
											<button className="btn btn-outline-primary"
													onClick={() => submitReply(comment.id, index)}>작성
											</button>
										</div>
									</div>
								) : (
									<></>
								)
							}
						</div>
					)) : (
					<></>
				)
			}
			<div className="row mt-lg-3">
				<div className="col">
					<input
						placeholder="댓글 작성하기"
						className="form-control w-100"
						value={content}
						onChange={handleWriting}
					/>
				</div>
				<div className="col-auto">
					<button className="btn btn-outline-primary"
							onClick={submitComment}>작성
					</button>
				</div>
			</div>
		</div>
	)
}