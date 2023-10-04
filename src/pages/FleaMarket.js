import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {PostCard} from "../components/post/PostCard/PostCard";
import axios from "axios";
import cookie from "react-cookies";
import {Context} from "../context/Context";
import SearchIcon from '@mui/icons-material/Search';

export const FleaMarket = () => {

	const {getHeaders} = useContext(Context);

	const [page, setPage] = useState(0);
	const [count, setCount] = useState(0);
	const [posts, setPosts] = useState([]);
	const [keyword, setKeyword] = useState("");

	const params = useParams();
	const navigate = useNavigate();

	const regionKorean = {
		서울: '서울특별시',
		부산: '부산광역시',
		대구: '대구광역시',
		인천: '인천광역시',
		광주: '광주광역시',
		대전: '대전광역시',
		울산: '울산광역시',
	}

	const regions = [
		{ value: '', label: '지역을 선택하세요' },
		{ value: '서울', label: '서울특별시' },
		{ value: '부산', label: '부산광역시' },
		{ value: '대구', label: '대구광역시' },
		{ value: '인천', label: '인천광역시' },
		{ value: '광주', label: '광주광역시' },
		{ value: '대전', label: '대전광역시' },
		{ value: '울산', label: '울산광역시' },
	]

	useEffect(() => {
		async function getPosts() {
			const headers = getHeaders()

			if(params.region === undefined)
				params.region = "";

			const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/list?address=${params.region}&page=${page}`, {
				headers: headers
			});

			console.log(res)

			setPosts(res.data.result.posts)
			setCount(res.data.result.count);
		}

		getPosts();
	}, [params.region, page])

	const handleOptionChange = (e) => {
		const selected = e.target.value;
		navigate(`/flea/${selected}`)
	};

	const handleKeyWordSearch = (e) => {
		setKeyword(e.target.value);
	}

	const handleSearch = async () => {
		setPage(0);
		const headers = getHeaders()

		console.log(params.region)

		const res = await axios.get(`${process.env.REACT_APP_url}/api/product/post/search?address=${params.region}&keyword=${keyword}&page=${page}`, {
			headers: headers
		});

		setPosts(res.data.result.posts);
		setCount(res.data.result.count);
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter')
			handleSearch();
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
						<div className="row">
							<div className="col">
								<input
									placeholder="키워드를 입력하세요"
									className="form-control"
									value={keyword}
									onChange={handleKeyWordSearch}
									onKeyDown={handleKeyPress}
								/>
							</div>
							<div className="col-auto">
								<button className="btn" onClick={handleSearch}>
									<SearchIcon />
								</button>
							</div>
						</div>
					</div>
					<div className="text-end mt-5">
						<button
							className="btn btn-lg btn-primary"
							onClick={() => navigate("/product/write")}
						>글 작성하기</button>
					</div>
				</div>
			</div>
			<div className="row mt-lg-5" style={{clear: "both"}}>
				<PostCard posts = {posts}/>
			</div>
			{
				(page + 1) * 20 < count ? (
					<button className="btn btn-primary w-100" onClick={() => setPage(page + 1)}>게시글 더 보기</button>
				) : (
					<></>
				)
			}
		</div>
	)
}