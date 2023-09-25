import {Link, useNavigate} from "react-router-dom";
import cookie from "react-cookies";

export const Nav = () => {

	const isLogin = cookie.load("access_token");

	const nav = useNavigate();

	const handleLogin = () => {
		nav("/login")
	}

	const handleLogout = () => {
		const result = window.confirm("로그아웃 하시겠습니까?");
		if (result) {
			cookie.remove("access_token");
			nav('/home');
			window.location.reload();
		}
	}

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
							{
								isLogin ? (
									<div className="row">
										<div className="col-auto">
											<Link className="nav-link" to={"/profile"}>내 프로필</Link>
										</div>
										<div className="col-auto">
											<button
												className="btn btn-danger"
												onClick={handleLogout}
											>
												로그아웃
											</button>
										</div>
									</div>

								) : (
									<button
										className="btn btn-primary"
										onClick={handleLogin}
									>
										로그인
									</button>
								)
							}
						</ul>

					</div>
				</div>

			</div>
		</nav>
	);
}