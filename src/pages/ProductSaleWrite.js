import {useState} from "react";

export const ProductSaleWrite = () => {

	const [rows, setRows] = useState(1);

	const handleChange = (event) => {
		setRows(event.target.value.split('\n').length);
	}

	return (
		<div className="container text-start mt-lg-5">
			<h3>제목</h3>
			<input
				className="form-control"
				placeholder="제목"
			/>
			<br/>
			<br/>
			<h3>판매 가격</h3>
			<input
				className="form-control"
				placeholder="\ 가격을 입력해주세요"
			/>
			<br/>
			<br/>
			<h3>물건 설명</h3>
			<textarea
				className="form-control"
				placeholder="\ 가격을 입력해주세요"
				rows = {rows}
				onChange = {handleChange}
				style={{resize: 'none'}}
			/>
			<div className="form-check">
				<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
					<label className="form-check-label" htmlFor="flexCheckDefault">
						가격 제안 받기
					</label>
			</div>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<div>
				<button className="btn btn-warning w-100">글 작성하기</button>
			</div>
		</div>
	)
}