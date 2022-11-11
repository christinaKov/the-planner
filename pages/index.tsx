import Head from "next/head";
import TodoList from "../components/TodoList";

// Styles
import styled from "styled-components";

// Supabase Auth
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

export default function Home() {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<Head>
				<title>The Planner</title>
				<meta name="description" content="web planner" />
			</Head>

			<div className="container" style={{ padding: "50px 0 100px 0" }}>
				{!session ? (
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
					/>
				) : (
					<Account session={session} />
				)}
			</div>
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
