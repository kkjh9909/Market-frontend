import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useContext} from "react";
import {Context} from "../../context/Context";
import axios from "axios";

export const Reply = ({comment, reply, index, toggleWriteReply, comments, setComments}) => {

	const {monthDayTime, getHeaders} = useContext(Context)

	const handleLike = async (replyId) => {
		const headers = getHeaders();

		const res = await axios.post(`${process.env.REACT_APP_url}/api/neighbor/comment/like/${replyId}`, null, {
			headers
		})

		const updatedComments = [...comments]; // comments 배열의 복사본을 만듭니다.

		const commentIndex = updatedComments.findIndex(c => c.id === comment.id);

		if (commentIndex !== -1) {
			const commentCopy = { ...updatedComments[commentIndex] }; // 중첩 배열의 복사본을 만듭니다.

			const replyIndex = commentCopy.replies.findIndex(reply => reply.id === replyId);

			if (replyIndex !== -1) {
				// 중첩 배열의 요소를 변경합니다.
				commentCopy.replies[replyIndex] = { ...commentCopy.replies[replyIndex], is_like: true, like_count: res.data.result.like_count };

				// 중첩 배열을 포함한 상위 배열을 업데이트합니다.
				updatedComments[commentIndex] = commentCopy;
			}
		}

		setComments(updatedComments);
	};


	const handleDislike = async (replyId) => {
		const headers = getHeaders();

		const res = await axios.delete(`${process.env.REACT_APP_url}/api/neighbor/comment/like/${replyId}`, {
			headers
		})

		const updatedComments = [...comments]; // comments 배열의 복사본을 만듭니다.

		const commentIndex = updatedComments.findIndex(c => c.id === comment.id);

		if (commentIndex !== -1) {
			const commentCopy = { ...updatedComments[commentIndex] }; // 중첩 배열의 복사본을 만듭니다.

			const replyIndex = commentCopy.replies.findIndex(reply => reply.id === replyId);

			if (replyIndex !== -1) {
				// 중첩 배열의 요소를 변경합니다.
				commentCopy.replies[replyIndex] = { ...commentCopy.replies[replyIndex], is_like: false, like_count: res.data.result.like_count };

				// 중첩 배열을 포함한 상위 배열을 업데이트합니다.
				updatedComments[commentIndex] = commentCopy;
			}
		}

		setComments(updatedComments);
	}

	return (
		<div className="mt-3 ms-lg-5 bg-light">
			<div className="row">
				<div className="col-auto">
					<img src={reply.profile} className="img-thumbnail"/>
				</div>
				<div className="col border p-3">
					<h3>{reply.nickname}</h3>
					<p>{reply.content}</p>
					<div className="row align-items-center">
						<div className="col-auto">
							<p>{monthDayTime(reply.created_time)}</p>
						</div>
						<div className="col-auto">
							<p>
								{
									reply.is_like ? (
										<button className="btn" onClick={() => handleDislike(reply.id)}><ThumbUpAltIcon /></button>
									) : (
										<button className="btn" onClick={() => handleLike(reply.id)}><ThumbUpOffAltIcon /></button>
									)
								}
								{reply.like_count}
							</p>
						</div>
						<div className="row">
							<div className="col-auto">
								<button className="btn" onClick={() => toggleWriteReply(index)}>답글</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}