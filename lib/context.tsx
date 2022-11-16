// Import React
import React, { createContext, useContext, useState } from "react";

// Import Types
import { Database } from "../types/supabase";
type Todos = Database["public"]["Tables"]["todos"]["Row"];

type TodoContextType = {
	todoList: Todos[];
	setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
	fetchTodos: (user_id: string | undefined) => void;
};

// Create Context
const ListContext = createContext<TodoContextType>({} as TodoContextType);

interface props {
	children: JSX.Element | JSX.Element[];
}

// Supabase
import { createClient, SupabaseClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<any, "public", any>;
if (supabaseUrl && supabaseKey)
	supabase = createClient(supabaseUrl, supabaseKey);

// Supabase User
import { useUser } from "@supabase/auth-helpers-react";

export const StateContext = ({ children }: props) => {
	let supabase: SupabaseClient<any, "public", any>;
	if (supabaseUrl && supabaseKey)
		supabase = createClient(supabaseUrl, supabaseKey);

	//Add our data for the state
	const [todoList, setTodoList] = useState<Todos[]>([]);

	const fetchTodos = async (user_id: string | undefined) => {
		if (user_id) {
			let { data: todos, error } = await supabase
				.from("todos")
				.select("*")
				.eq("user_id", user_id);
			if (todos)
				setTodoList(
					todos
						.sort((a, b) => {
							return a.id - b.id;
						})
						.reverse()
				);
		}
	};

	return (
		<ListContext.Provider value={{ todoList, setTodoList, fetchTodos }}>
			{children}
		</ListContext.Provider>
	);
};

export const useStateContext = () => useContext(ListContext);
