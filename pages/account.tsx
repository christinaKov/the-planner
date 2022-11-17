import { useState, useEffect } from "react";
import {
	useUser,
	useSupabaseClient,
	Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

// Styles
import styled from "styled-components";
import { StyledMainBtn } from "../styles/Main.styled";
import { StyledMainInput } from "../styles/Main.styled";

export default function Account({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState<String | undefined>("");
	const [username, setUsername] = useState<Profiles["username"]>(null);
	const [website, setWebsite] = useState<Profiles["website"]>(null);
	const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

	useEffect(() => {
		if (user) getProfile();
		setEmail(user?.email);
	}, [session, user]);

	async function getProfile() {
		try {
			setLoading(true);
			//if (!user) throw new Error("No user");

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, website, avatar_url`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			//alert("Error loading user data!");
			//console.log(error);
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		website,
		avatar_url,
	}: {
		username: Profiles["username"];
		website: Profiles["website"];
		avatar_url: Profiles["avatar_url"];
	}) {
		try {
			setLoading(true);
			if (!user) throw new Error("No user");

			const updates = {
				id: user.id,
				username,
				website,
				avatar_url,
				updated_at: new Date().toISOString(),
			};

			let { error } = await supabase.from("profiles").upsert(updates);
			if (error) throw error;
			//alert("Profile updated!");
		} catch (error) {
			//alert("Error updating the data!");
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<StyledAccount className="form-widget">
			<p>{email}</p>
			<StyledInputWrapper>
				<label htmlFor="username">Username:</label>
				<StyledMainInput
					id="username"
					type="text"
					value={username || ""}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label htmlFor="website">Your website:</label>
				<StyledMainInput
					id="website"
					type="website"
					value={website || ""}
					onChange={(e) => setWebsite(e.target.value)}
				/>
			</StyledInputWrapper>

			<StyledAccountBtns>
				<StyledMainBtn
					className="button primary block"
					onClick={() => updateProfile({ username, website, avatar_url })}
					disabled={loading}
				>
					{loading ? "Loading ..." : "Update"}
				</StyledMainBtn>
				<StyledMainBtn
					className="button block"
					onClick={() => supabase.auth.signOut()}
				>
					Sign Out
				</StyledMainBtn>
			</StyledAccountBtns>
		</StyledAccount>
	);
}

const StyledAccount = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
	gap: 2vw;
`;

const StyledInputWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledAccountBtns = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1.5vw;
`;
