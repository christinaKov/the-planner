import TodoList from "../components/TodoList";

// Supabase Auth
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home() {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<div>
			<div>
				{!session ? (
					<Auth
						supabaseClient={supabase}
						appearance={{ theme: ThemeSupa }}
						theme="dark"
					/>
				) : (
					<TodoList />
				)}
			</div>

			<footer></footer>
		</div>
	);
}
