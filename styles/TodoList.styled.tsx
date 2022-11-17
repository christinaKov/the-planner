import styled from "styled-components";

export const StyledWrapper = styled.div`
	/* hide scrollbar but allow scrolling */
	-ms-overflow-style: none; /* for Internet Explorer, Edge */
	scrollbar-width: none; /* for Firefox */
	overflow-y: scroll;

	::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}
	width: 50vw;
	height: 75vh;
	position: relative;
	background: #f1f1f1;
	border-radius: 0.5vw;
	overflow: auto;
	border: 0.01vw black solid;
`;

export const StyledInputWrapper = styled.form`
	display: flex;
	border-bottom: 0.01vw black solid;
	position: sticky;
	top: 0;
	input {
		flex: 1;
		padding-left: 2rem;
	}
	button {
		background: black;
		color: #f1f1f1;
		width: 13vw;
	}
	input,
	button {
		height: 4.5vw;
		border: none;
		border-top: none;
		outline: none;
		font-size: 1.5rem;
	}
`;

export const StyledTodoList = styled.ul`
	li {
		cursor: pointer;
		padding-left: 2vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01vw black solid;
		height: 4vw;
	}
	li.checked {
		text-decoration: line-through;
	}
	li:focus-visible {
		outline: black auto 1px;
	}
`;

export const StyledTodoBtns = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	height: 100%;
	width: 13vw;
`;

export const StyledTodoBtn = styled.button`
	width: 100%;
	height: 100%;
	border: none;
	border-left: 0.01vw solid black;
	font-size: 1rem;
`;

export const ChangeTodoWrapper = styled.form`
	width: 100vw;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #0000007b;

	input {
		width: 70%;
	}
`;
