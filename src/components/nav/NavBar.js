import {Link, useNavigate} from "react-router-dom";
import cookie from "react-cookies";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {

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
		<Navbar expand="lg" bg="light">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/flea">중고거래</Nav.Link>
						<Nav.Link href="/neighbor">일상게시글</Nav.Link>
						{/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
						{/*	<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
						{/*	<NavDropdown.Item href="#action/3.2">*/}
						{/*		Another action*/}
						{/*	</NavDropdown.Item>*/}
						{/*	<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
						{/*	<NavDropdown.Divider />*/}
						{/*	/!*<NavDropdown.Item href="#action/3.4">*!/*/}
						{/*	/!*	Separated link*!/*/}
						{/*	/!*</NavDropdown.Item>*!/*/}
						{/*</NavDropdown>*/}
					</Nav>
				</Navbar.Collapse>
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
			</Container>
		</Navbar>
	);
}