import './Chat.css'
import {useContext} from "react";
import {Context} from "../../context/Context";

export const YourChat = ({key, message}) => {

	const {calculateDate} = useContext(Context);

	return (
		<div className="row mt-3">
			<div className="col-auto">
				<img src={message.profile_image} style={{width: "50px", height: "50px", borderRadius: "50%"}}/>
			</div>
			<div className="col-auto your-chat inline-block-container">
				<div className="m-2">
					<p>{message.message}</p>
				</div>
			</div>
			<div className="col-auto">
				<div className="pt-4">
					<p className="time">{calculateDate(new Date(message.created_time))}</p>
				</div>
			</div>
		</div>
	)
}