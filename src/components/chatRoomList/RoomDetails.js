import {useContext} from "react";
import {Context} from "../../context/Context";
import {Link} from "react-router-dom";
import './RoomDetails.css'

export const RoomDetails = ({details}) => {

	const {calculateDate} = useContext(Context);

	return (
		<Link
			to={`/chat/${details.id}`}
			state={{room_id: details.id}}
			className="nav-link"
		>
			<div className="row">
				<div className="col-auto align-middle">
					<div className="align-items-center">
						<img
							src={`${details.other_profile}`}
							className="align-self-center"
							style={{ width: '50px', height: '50px', objectFit: 'cover' }}
						/>
					</div>
				</div>
				<div className="col">
					<div className="row">
						<div className="col-auto">
							<p>{details.other_nickname}</p>
						</div>
						<div className="col-auto address">
							<p>{details.other_address}</p>
						</div>
						<div className="col-auto">
							<p>{calculateDate(new Date(details.last_message_time))}</p>
						</div>
					</div>
					<div className="text-start">
						<p>{details.last_message}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}