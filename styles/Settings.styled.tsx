import styled from "styled-components";

export const StyledAccount = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
	gap: 2rem;
	font-size: 1rem;
	@media (max-width: 420px) {
		width: 80vw;
	}
`;

export const StyledInputWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	input {
		min-width: 70%;
	}
`;

export const StyledAccountBtns = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1.5rem;

	button {
		width: 100%;
	}
`;

export const StyledCheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 0.3rem;

	input:checked {
		accent-color: black;
	}
`;
