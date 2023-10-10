import React, {createContext} from "react";
import cookie from "react-cookies";

const Context = createContext({})

const ContextProvider = ({children}) => {

	const calculateDate = (date) => {
		const milliSeconds = new Date() - date;
		const seconds = milliSeconds / 1000;
		if (seconds < 60) return `방금 전`;
		const minutes = seconds / 60;
		if (minutes < 60) return `${Math.floor(minutes)}분 전`;
		const hours = minutes / 60;
		if (hours < 24) return `${Math.floor(hours)}시간 전`;
		const days = hours / 24;
		if (days < 7) return `${Math.floor(days)}일 전`;
		const weeks = days / 7;
		if (weeks < 5) return `${Math.floor(weeks)}주 전`;
		const months = days / 30;
		if (months < 12) return `${Math.floor(months)}개월 전`;
		const years = days / 365;
		return `${Math.floor(years)}년 전`;
	}

	const monthDayTime = (date) => {
		const dateTime = new Date(date);

		const month = dateTime.getMonth() + 1;
		const day = dateTime.getDate();
		const hours = dateTime.getHours();
		const minutes = dateTime.getMinutes();

		return `${month}/${day} ${hours}:${minutes}`;
	}

	const getHeaders = () => {
		const headers = {};

		const access_token = cookie.load("access_token");
		if (access_token) {
			headers["Authorization"] = `Bearer ${access_token}`;
		}

		return headers;
	}

	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<Context.Provider value={{calculateDate, getHeaders, formatPrice, monthDayTime}}>
			{children}
		</Context.Provider>
	)
}

export {Context, ContextProvider};