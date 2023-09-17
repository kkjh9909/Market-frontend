import './Chat.css';
import {MyChat} from "./MyChat";
import {YourChat} from "./YourChat";

export const ChatList = ({messages, me}) => {
	return (
		<div className="scroll-container chat-bg">
			<div className="content">
					{
						messages.map(message => (
							message.sender_id === me ? (
								<MyChat
									key={message.id}
									message={message}
								/>
							) : (
								<YourChat
									key={message.id}
									message={message}
								/>
							))
						)
					}
			</div>
		</div>

	)
}