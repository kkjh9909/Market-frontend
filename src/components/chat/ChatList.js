import './Chat.css';
import {MyChat} from "./MyChat";
import {YourChat} from "./YourChat";
import {useEffect, useRef} from "react";

export const ChatList = ({messages, me, message}) => {
	const scrollContainerRef = useRef();
	const scrollToBottom = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="scroll-container chat-bg"  ref={scrollContainerRef}>
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