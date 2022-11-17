import Head from "next/head";

export default function HeadComponent() {
	return (
		<Head>
			<title>The Planner</title>
			<meta name="description" content="web planner" />
			<link rel="preconnect" href="https://fonts.googleapis.com"></link>
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="true"
			></link>
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,200;1,100;1,200&display=swap"
				rel="stylesheet"
			></link>
		</Head>
	);
}
