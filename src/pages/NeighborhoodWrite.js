import {useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {ImageUploader} from "../lib/ImageUploader";
import {useNavigate} from "react-router-dom";

export const NeighborhoodWrite = () => {

	const nav = useNavigate();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("일상");
	const [images, setImages] = useState([]);

	const [rows, setRows] = useState(5);

	const handleChange = (event) => {
		setRows(event.target.value.split('\n').length + 5);
		setContent(event.target.value);
	}

	const topics = [
		{ label: "일상", value: "일상" },
		{ label: "동네질문", value: "동네질문" },
		{ label: "생활정보", value: "생활정보" },
		{ label: "취미생활", value: "취미생활" }
	];

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];

		const image = await ImageUploader(file);

		setImages([...images, image]);
	}

	const handleRemoveImage = (imageToDelete) => {
		const updatedImages = images.filter((image) => image !== imageToDelete);
		setImages(updatedImages);
	};

	const handleOptionChange = (e) => {
		const selected = e.target.value;

		setCategory(selected);

	};

	const handleSubmit = async () => {
		const res = await axios.post(`${process.env.REACT_APP_url}/api/neighbor/post/write`, {
			"title": title,
			"content": content,
			"category":category,
			"images": images
		}, {
			headers: {
				"Authorization": "Bearer " + cookie.load("access_token")
			}
		})

		nav("/neighbor");
	}

	return (
		<div className="container mt-lg-5">
			<input
				type="file"
				className="form-control"
				accept="image/*" // 이미지 파일만 업로드 허용
				onChange={handleImageUpload} // 파일 선택 시 호출되는 함수
			/>
			<div className="form-group row">
				{images.length > 0 && (
					images.map(img => (
						<div key={img}
							 className="mt-3 col-auto"
							 onClick={() => handleRemoveImage(img)}
						>
							<img
								src={img}
								alt="미리보기 이미지"
								style={{ width: "100px", height: "100px" }}
							/>
						</div>
					))
				)}
			</div>
			<br/>
			<br/>
			<h3>제목</h3>
			<input
				className="form-control"
				placeholder="제목"
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<br/>
			<br/>
			<h3>내용</h3>
			<textarea
				className="form-control"
				placeholder="물건을 설명해보세요"
				rows = {rows}
				onChange = {handleChange}
				style={{resize: 'none'}}
				value={content}
			/>
			<br/>
			<br/>
			<br/>
			<div className="col">
				<h3 className="form-label">카테고리</h3>
				<select
					className="form-control w-100"
					id="selectOption"
					value={category}
					defaultValue="일상"
					onChange={handleOptionChange}
				>
					{topics.map(topic => (
						<option
							key={topic.value}
							value={topic.value}
						>
							{topic.label}
						</option>
					))}
				</select>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div>
				<button className="btn btn-success w-100" onClick={handleSubmit}>글 작성하기</button>
			</div>
		</div>
	)
}