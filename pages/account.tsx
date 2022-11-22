import { useState, useEffect } from "react";
import {
	useUser,
	useSupabaseClient,
	Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../types/supabase";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
type SortingTypes = Profiles["sorting_types"];

import Link from "next/link";

// Styles
import { StyledMainBtn } from "../styles/Main.styled";
import {
	StyledAccount,
	StyledAccountBtns,
	StyledCheckboxWrapper,
} from "../styles/Settings.styled";

// Components
import AccountSettings from "../components/AccountSettings";

export default function Account({ session }: { session: Session }) {
	const supabase = useSupabaseClient<Database>();
	const user = useUser();
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState<String | undefined>("");
	const [username, setUsername] = useState<Profiles["username"]>(null);
	const [website, setWebsite] = useState<Profiles["website"]>(null);
	const [avatar_url, setAvatarUrl] = useState<Profiles["avatar_url"]>(null);

	const [sortingTypes, setSortingTypes] =
		useState<Profiles["sorting_types"]>(null);

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
				.select(`username, website, avatar_url, sorting_types`)
				.eq("id", user?.id)
				.single();

			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
				setSortingTypes(data.sorting_types);
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

	const handleCheckedSorting = async () => {
		let { data } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user?.id)
			.select("sorting_types");

		if (data) {
			const currentTypes = data[0].sorting_types as SortingTypes;

			let newTypes;
			if (currentTypes?.includes("by_checked")) {
				newTypes = { sorting_types: null };
			} else newTypes = { sorting_types: ["by_checked"] };

			const { data: sort } = await supabase
				.from("profiles")
				.update(newTypes)
				.eq("id", user?.id)
				.select("sorting_types");
			if (sort) setSortingTypes(sort[0]?.sorting_types);
		}
	};

	return (
		<StyledAccount className="form-widget">
			<p>{email}</p>
			<AccountSettings
				username={username}
				setUsername={setUsername}
				website={website}
				setWebsite={setWebsite}
			/>

			<StyledCheckboxWrapper>
				<input
					checked={sortingTypes ? sortingTypes.includes("by_checked") : false}
					onChange={handleCheckedSorting}
					id="checkedSorting"
					type="checkbox"
				/>
				<label htmlFor="checkedSorting">Sort checked tasks to bottom</label>
			</StyledCheckboxWrapper>

			<StyledAccountBtns>
				<StyledMainBtn
					className="button primary block"
					onClick={() => updateProfile({ username, website, avatar_url })}
					disabled={loading}
				>
					{loading ? "Loading ..." : "Update"}
				</StyledMainBtn>
				<Link className="styled-btn" href="/">
					<StyledMainBtn onClick={() => supabase.auth.signOut()}>
						Sign Out
					</StyledMainBtn>
				</Link>
			</StyledAccountBtns>
		</StyledAccount>
	);
}
