import './NeighborPost.css'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import {useContext} from "react";
import {Context} from "../../context/Context";

export const NeighborPost = ({post}) => {

	const {calculateDate} = useContext(Context);

	return (
		<div className="mt-1 text-start p-3">
			<div>
				<p className="category">{post.category}</p>
			</div>
			<div>
				<h4 className="content-body">
					{post.title}
				</h4>
			</div>
			<div>
				<p className="content-body">
					{post.content}
				</p>
			</div>
			<div className="row">
				<div className="col-auto">
					<ThumbUpOffAltIcon /> {post.like_count}
				</div>
				<div className="col-auto">
					<RemoveRedEyeIcon /> {post.hit_count}
				</div>
				<div className="col-auto">
					<AccessAlarmIcon /> {calculateDate(new Date(post.time))}
				</div>
			</div>
			<hr />
		</div>
	)
}