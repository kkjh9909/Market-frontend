import {Link} from "react-router-dom";

export const Nav = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<Link className="navbar-brand" to="/">홈</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<div className="d-flex justify-content-between w-100">
						<ul className="navbar-nav col-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/flea">중고거래</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/flea">동네생활</Link>
							</li>
						</ul>
						<ul className="navbar-nav">
							<input
								placeholder="키워드를 입력하세요"
								className="form-control w-auto"
							/>
							<li className="nav-item">
								<Link className="nav-link" to="/flea/busan">검색하기</Link>
							</li>
						</ul>
					</div>
				</div>

			</div>
		</nav>
	);
}