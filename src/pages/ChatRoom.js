import {useContext, useEffect, useRef, useState} from "react";
import SockJS from "sockjs-client"
import {Stomp} from "@stomp/stompjs"
import {useLocation} from "react-router-dom";
import {YourChat} from "../components/chat/YourChat";
import {MyChat} from "../components/chat/MyChat";
import cookie from "react-cookies";
import {ChatList} from "../components/chat/ChatList";
import axios from "axios";
import {Context} from "../context/Context";

export const ChatRoom = () => {

	const location = useLocation();
	const {getHeaders} = useContext(Context);

	let client = useRef(null);

	const [message, setMessage] = useState("");
	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);

	const [messages, setMessages] = useState([]);
	const [myId, setMyId] = useState(0);

	useEffect(() => {
		const connectSocket = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/user/id`, {
				headers: headers
			});

			setMyId(res.data.result);

			client.current = Stomp.over(() => {
				return new SockJS(`${process.env.REACT_APP_url}/ws-stomp`);
			});


			client.current.connect(headers, () => {

				client.current.subscribe(`/topic/${location.state.room_id}`, function(msg){
					setMessages((prevMessages) => [...prevMessages, JSON.parse(msg.body)]);
				})
			})
		}

		connectSocket();
		return () => client.current.disconnect();
	}, [location.state.room_id])

	useEffect(() => {
		const getMessages = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/chats/${location.state.room_id}?page=${page}`, {
				headers: headers
			});

			setCount(res.data.result.count);
			setMessages((prevMessages) => [...res.data.result.messages.chats.reverse(), ...prevMessages]);
		}

		getMessages();
	}, [page])

	const handleSend = () => {
		const headers = getHeaders();

		client.current.send(`/app/chat/${location.state.room_id}`, headers, JSON.stringify(message))
		setMessage("");
	}

	const handleWrite = (e) => {
		const msg = e.target.value;
		setMessage(msg);
	}

	const getAdditionalMessages = async () => {
		setPage(page + 1);
	}

	return (
		<div className="container mt-lg-5">
			<div>
				{
					(page + 1) * 20 < count ? (
						<button className="btn btn-primary" onClick={getAdditionalMessages}>더불러오기</button>
					) : (
						<></>
					)
				}
				<ChatList
					messages={messages}
					me={myId}
					message={message}
				/>
			</div>
			<div className="row mt-lg-5">
				<div className="col">
					<input
						placeholder="메시지 보내기"
						className="form-control w-100"
						value={message}
						onChange={handleWrite}
					/>
				</div>
				<div className="col-auto">
					<button className="btn btn-warning" onClick={handleSend}>전송</button>
				</div>
			</div>
		</div>
	)
}