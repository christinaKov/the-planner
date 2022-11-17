// Styles
import styled from "styled-components";
import { StyledMainBtn } from "../styles/Main.styled";

// Supabase
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

// Router
import Link from "next/link";

export default function Nav() {
	const session = useSession();
	const supabase = useSupabaseClient();
	return (
		<StyledNav>
			<Link href="/" className="logo">
				the-planner
			</Link>
			{session && (
				<div>
					<StyledMainBtn>
						<Link href="/account">Change Profile</Link>
					</StyledMainBtn>
				</div>
			)}
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	margin-top: 2vw;
	margin-bottom: 5vw;
	width: 50vw;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.logo {
		font-size: 1.5rem;
	}

	div {
		display: flex;
		gap: 2vw;
		height: 100%;
	}
`;
