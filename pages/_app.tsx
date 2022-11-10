import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StateContext } from "../lib/context";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StateContext>
			<Component {...pageProps} />
		</StateContext>
	);
}
