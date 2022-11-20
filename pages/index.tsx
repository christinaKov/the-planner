// Components
import TodoList from "../components/TodoList";

// Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
// Supabase Auth
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { StyledMainBtn } from "../styles/Main.styled";

export default function Home() {
	const session = useSession();
	const supabase = useSupabaseClient();

	async function signInWithGoogle() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});
	}

	return (
		<div>
			<div>
				{!session ? (
					<StyledAuth>
						<Auth
							supabaseClient={supabase}
							appearance={{ theme: ThemeSupa }}
							theme="dark"
						/>
						<StyledSocialAuth>
							<p>or:</p>
							<StyledMainBtn onClick={signInWithGoogle}>
								<FontAwesomeIcon icon={faGoogle} />
							</StyledMainBtn>
						</StyledSocialAuth>
					</StyledAuth>
				) : (
					<TodoList />
				)}
			</div>

			<footer></footer>
		</div>
	);
}

const StyledAuth = styled.div`
	* {
		font-size: 1.2rem;
	}
`;

const StyledSocialAuth = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2vw;
	align-items: center;
`;
