import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PostCard} from "../components/post/PostCard/PostCard";
import axios from "axios";
import cookie from "react-cookies";

export const FleaMarket = () => {
	const [region, setRegion] = useState('');

	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [posts, setPosts] = useState([]);

	const params = useParams();
	const navigate = useNavigate();

	const regionKorean = {
		seoul: '서울특별시',
		busan: '부산광역시',
		daegu: '대구광역시',
		incheon: '인천광역시',
		gwangju: '광주광역시',
		daejeon: '대전광역시',
		ulsan: '울산광역시',
	}

	const regions = [
		{ value: '', label: '지역을 선택하세요' },
		{ value: 'seoul', label: '서울특별시' },
		{ value: 'busan', label: '부산광역시' },
		{ value: 'daegu', label: '대구광역시' },
		{ value: 'incheon', label: '인천광역시' },
		{ value: 'gwangju', label: '광주광역시' },
		{ value: 'daejeon', label: '대전광역시' },
		{ value: 'ulsan', label: '울산광역시' },
	]

	useEffect(() => {
		async function asd() {
			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/list?address=${region}&page=${page}`, {
				headers: {
					"Authorization": "Bearer " + cookie.load("access_token")
				}
			});

			setPosts(res.data.post_info)
			setCount(res.data.count)
		}

		asd();
	}, [params.region])

	const handleOptionChange = (e) => {
		const selected = e.target.value;
		setRegion(selected);
		navigate(`/flea/${selected}`)
	};

	return (
		<div className="container mt-lg-5">
			<h1>{regionKorean[params.region] || ''} 인기 매물</h1>
			<div className="w-100 row">
				<div>
					<div className="col">
					<select
						className="form-control w-25"
						id="selectOption"
						value={params.region}
						onChange={handleOptionChange}
					>
					{regions.map(option => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
					</select>
					</div>
					<div className="col">
					<input
						placeholder="키워드를 입력하세요"
						className="form-control w-auto"
					/>
					</div>
				</div>
			</div>
			<div className="row mt-lg-5" style={{clear: "both"}}>
				<PostCard posts = {posts}/>
			</div>
		</div>
	)
}