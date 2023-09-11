import React, {useEffect, useState} from "react";

const ImageSlider = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPreviousSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const goToNextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="w-100 text-center">
			<button onClick={goToPreviousSlide} className="btn btn-lg btn-primary">&lt;</button>
			<img
				src={images[currentIndex]}
				alt="Slider"
				style={{width: '500px', height: '500px'}}
			/>
			<button onClick={goToNextSlide} className="btn btn-lg btn-primary">&gt;</button>
		</div>
	);
};

export default ImageSlider;
