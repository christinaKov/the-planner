import Head from "next/head";
import TodoList from "./TodoList";

// Styles
import styled from "styled-components";

export default function Home() {
	return (
		<div>
			<Head>
				<title>The Planner</title>
				<meta name="description" content="web planner" />
			</Head>

			<StyledMain>
				<TodoList />
			</StyledMain>

			<footer></footer>
		</div>
	);
}

const StyledMain = styled.div`
	width: 100%;
	height: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ff9bc8;
`;
