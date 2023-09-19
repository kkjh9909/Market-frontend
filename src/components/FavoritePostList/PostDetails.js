
import {useContext} from "react";
import {Context} from "../../context/Context";
import {Link} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import './RoomDetails.css'

export const PostDetails = ({details}) => {

	const {calculateDate, formatPrice} = useContext(Context);

	return (
		<Link
			to={`/product/${details.id}`}
			state={{postId: details.id}}
			className="nav-link"
		>
			<div className="row">
				<div className="col-auto align-middle">
					{/*<div className="">*/}
						<img
							src={`${details.thumbnail}`}
							className="align-self-center img-fluid"
							style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
						/>
					{/*</div>*/}
				</div>
				<div className="col">
					<div className="row">
						<div className="col-auto">
							<p>{details.title}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-auto address">
							<p>{details.address}</p>
						</div>
						<div className="col-auto">
							<p>{calculateDate(new Date(details.created_time))}</p>
						</div>
					</div>
					<div className="row">
						<div className="col-auto">
							<b>{formatPrice(details.price)}원</b>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-auto">
							<p><FavoriteBorderIcon /> {details.favorite_count}</p>
						</div>
						<div className="col-auto">
							<p><ChatBubbleOutlineIcon /> {details.chatroom_count}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}