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

	let client = useRef(null);

	const [message, setMessage] = useState("");

	const [messages, setMessages] = useState([]);
	const [myId, setMyId] = useState(0);

	useEffect(() => {

		const getMessages = async () => {
			const headers = {};

			const access_token = cookie.load("access_token");
			if (access_token) {
				headers["Authorization"] = `Bearer ${access_token}`;
			}

			const res = await axios.get(`${process.env.REACT_APP_url}/api/chats/${location.state.room_id}`, {
				headers: headers
			});

			setMessages(res.data.chatList.chats);
		}

		setMyId(location.state.my_id)
		console.log(location.state.my_id);

		client.current = Stomp.over(() => {
			return new SockJS(`${process.env.REACT_APP_url}/ws-stomp`);
		});

		const headers = {};

		const access_token = cookie.load("access_token");
		if (access_token) {
			headers["Authorization"] = `Bearer ${access_token}`;
		}

		client.current.connect(headers, () => {
			console.log("Connected success")

			const headers = {
				"Authorization": `Bearer ${cookie.load("access_token")}`
			}

			// client.current.send(`/app/chat/${location.state.room_id}`, headers, JSON.stringify("test1"))

			client.current.subscribe(`/topic/${location.state.room_id}`, function(message){
				console.log(message)

				setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);

				console.log("receive", JSON.parse(message.body))

				console.log(messages)
			})
		})

		getMessages();

		return () => client.current.disconnect();
	}, [])

	const handleSend = () => {
		const headers = {
			"Authorization": `Bearer ${cookie.load("access_token")}`
		}

		client.current.send(`/app/chat/${location.state.room_id}`, headers, JSON.stringify(message))
		setMessage("");
	}

	const handleWrite = (e) => {
		const msg = e.target.value;
		setMessage(msg);
	}

	return (
		<div className="container mt-lg-5">
			<div>
				<ChatList
					messages={messages}
					me={myId}
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
					<button onClick={() => console.log(messages)}> 메시지리스트</button>
			</div>
		</div>
	)
}