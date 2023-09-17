import './Chat.css'
import {useContext} from "react";
import {Context} from "../../context/Context";

export const MyChat = ({key, message}) => {

	const {calculateDate} = useContext(Context);

	return (
		<div className="row mt-3">
			<div className="col text-end">
				<div className="pt-5">
					<p className="time">{calculateDate(new Date(message.created_time))}</p>
				</div>
			</div>
			<div className="col-auto inline-block-container my-chat">
				<div className="m-2">
					<p>{message.message}</p>
				</div>
			</div>
		</div>
	)
}