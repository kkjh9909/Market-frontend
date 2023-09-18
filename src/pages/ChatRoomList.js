import {RoomDetails} from "../components/chatRoomList/RoomDetails";
import {useContext, useEffect, useState} from "react";
import {Context} from "../context/Context";
import axios from "axios";

export const ChatRoomList = () => {
	// data.js

	const {getHeaders} = useContext(Context);

	const [chatRooms, setChatRooms] = useState([])

	useEffect(() => {

		const getChatRooms = async () => {
			const headers = getHeaders();

			const res = await axios.get(`${process.env.REACT_APP_url}/api/chatroom/list`, {headers});

			setChatRooms(res.data.result.chat_rooms);
		}

		getChatRooms()
	}, [])

	return (
		<div className="container mt-lg-5">
			<h1 className="mb-4">채팅방 목록</h1>
			<ul className="list-group">
				{chatRooms.map((chatRoom) => (
					<li key={chatRoom.id} className="list-group-item">
						<RoomDetails
							details={chatRoom}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}