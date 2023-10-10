import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {useContext} from "react";
import {Context} from "../../context/Context";

export const Reply = ({reply, index, toggleWriteReply}) => {

	const {monthDayTime} = useContext(Context)

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
							<p><button className="btn"><ThumbUpAltIcon /></button> {reply.like_count}</p>
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