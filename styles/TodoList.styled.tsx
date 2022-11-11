import styled from "styled-components";

export const StyledWrapper = styled.div`
	width: 50vw;
	height: 90vh;
	background: #f1f1f1;
	border-radius: 0.5vw;
	overflow: auto;
	border: 0.01vw black solid;
`;

export const StyledInputWrapper = styled.form`
	display: flex;
	input {
		width: 80%;
	}
	button {
		background: black;
		color: #f1f1f1;
	}
	input,
	button {
		padding: 1rem 2rem;
		border: none;
		border-top: none;
		outline: none;
		font-size: 1.5rem;
	}
`;

export const StyledTodoList = styled.ul`
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01vw black solid;
	}
	li.checked {
		text-decoration: line-through;
	}
	li:focus-visible {
		outline: black auto 1px;
	}
`;

export const StyledTodoBtn = styled.button`
	width: 4vw;
	height: 4vw;
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
		padding: 1rem 2rem;
		width: 70%;
		border: none;
		border-top: none;
		outline: none;
		font-size: 1.5rem;
	}
`;
