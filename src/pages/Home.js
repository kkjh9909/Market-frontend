import {useNavigate} from "react-router-dom";

export const Home = () => {

	const nav = useNavigate();

	const goFlea = () => {
		nav("/flea")
	}

	const goDaily = () => {
		nav("/neighbor")
	}

	return (
		<div className="mt-lg-5 container border vh-100">
			<div className="mt-lg-5">
				<div>
					<button className="btn btn-lg btn-outline-primary" onClick={goFlea}>중고거래 게시판 가기</button>
				</div>
				<div className="mt-3">
					<button className="btn btn-lg btn-outline-primary" onClick={goDaily}>일상글 게시판 가기</button>
				</div>
			</div>
		</div>
	)
}