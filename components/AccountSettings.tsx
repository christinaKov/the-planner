// Styles
import { SetStateAction } from "react";
import { StyledInputWrapper } from "../styles/Settings.styled";
import { StyledMainInput } from "../styles/Main.styled";

// Types
interface AccountSettingsProps {
	username: string | null;
	setUsername: React.Dispatch<React.SetStateAction<string | null>>;
	website: string | null;
	setWebsite: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AccountSettings(props: AccountSettingsProps) {
	return (
		<>
			<StyledInputWrapper>
				<label htmlFor="username">Username:</label>
				<StyledMainInput
					id="username"
					type="text"
					value={props.username || ""}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						props.setUsername(e.target.value)
					}
				/>
			</StyledInputWrapper>
			<StyledInputWrapper>
				<label htmlFor="website">Your website:</label>
				<StyledMainInput
					id="website"
					type="website"
					value={props.website || ""}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						props.setWebsite(e.target.value)
					}
				/>
			</StyledInputWrapper>
		</>
	);
}
