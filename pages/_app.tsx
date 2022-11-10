import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StateContext } from "../lib/context";

// Supabase
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";

// React
import { useState } from "react";

export default function App({
	Component,
	pageProps,
}: AppProps<{
	initialSession: Session;
}>) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	return (
		<StateContext>
			<SessionContextProvider
				supabaseClient={supabaseClient}
				initialSession={pageProps.initialSession}
			>
				<Component {...pageProps} />
			</SessionContextProvider>
		</StateContext>
	);
}
