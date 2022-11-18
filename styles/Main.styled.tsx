import styled from "styled-components";

export const StyledMain = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
`;

export const StyledMainBtn = styled.button`
	border-radius: 0.5rem;
	background: black;
	color: #f1f1f1;
	padding: 0.5rem 1rem;
	border: none;
	border-top: none;
	outline: none;
	font-size: 1rem;
`;

export const StyledMainInput = styled.input`
	padding: 1rem 2rem;
	width: 70%;
	border: none;
	border-top: none;
	outline: none;
	font-size: 1.5rem;
`;
