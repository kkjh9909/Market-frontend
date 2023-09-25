import {useContext, useEffect, useState} from "react";
import axios from "axios";
import cookie from "react-cookies";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Context} from "../context/Context";

export const EditProductArticle = () => {

	let { postId } = useParams();

	const {getHeaders} = useContext(Context)
	const location = useLocation();
	const nav = useNavigate();

	const [rows, setRows] = useState(1);
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [isDeal, setIsDeal] = useState(false);

	const [images, setImages] = useState([]);

	useEffect(() => {
		const headers = getHeaders();
		console.log(postId)
		const getDetails = async () => {
			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/${postId}/edit`, {headers});

			console.log(res)

			setTitle(res.data.result.title);
			setPrice(res.data.result.price);
			setContent(res.data.result.content);
			setCategory(res.data.result.category);
			setIsDeal(res.data.result.deal);
			setImages(res.data.result.images);
		}

		getDetails();
	}, [])


	const handleChange = (event) => {
		setRows(event.target.value.split('\n').length);
		setContent(event.target.value);
	}

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];

		const formData = new FormData();
		formData.append('file', file);

		const res = await axios.post(`${process.env.REACT_APP_url}/images/upload`,
			formData,
			{
				headers: {
					"Authorization": "Bearer " + cookie.load("access_token")
				}
			})

		setImages([...images, res.data.image_url])
	}

	const handleSubmit = async () => {
		const res = await axios.put(`${process.env.REACT_APP_url}/api/product/post/${postId}/edit`, {
			"title": title,
			"price": price,
			"content": content,
			"category":category,
			"isDeal": isDeal,
			"images": images
		}, {
			headers: {
				"Authorization": "Bearer " + cookie.load("access_token")
			}
		})

		console.log(postId);

		nav(`/product/${postId}`, { state: { postId: postId } });
	}

	const handleRemoveImage = (imageToDelete) => {
		// 이미지 배열에서 클릭된 이미지를 제외한 새 배열 생성
		const updatedImages = images.filter((image) => image !== imageToDelete);
		setImages(updatedImages); // 이미지 배열 업데이트
	};

	return (
		<div className="container text-start mt-lg-5">
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
			<h3>판매 가격</h3>
			<input
				type="number"
				className="form-control"
				value={price}
				onChange={e => setPrice(e.target.value)}
				placeholder="\ 가격을 입력해주세요"
			/>
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					checked={isDeal}
					id="flexCheckDefault"
					onChange={e => setIsDeal(e.target.checked)}
				/>
				<label className="form-check-label" htmlFor="flexCheckDefault">
					가격 제안 받기
				</label>
			</div>
			<br/>
			<br/>
			<h3>물건 설명</h3>
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
			<h3>카테고리</h3>
			<input
				className="form-control"
				value={category}
				onChange={e => setCategory(e.target.value)}
				placeholder="카테고리를 입력해주세요"
			/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div>
				<button className="btn btn-warning w-100" onClick={handleSubmit}>글 작성하기</button>
			</div>
		</div>
	)
}