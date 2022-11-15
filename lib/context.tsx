// Import React
import React, { createContext, useContext, useState } from "react";

// Import Types
import { Database } from "../types/supabase";
type Todos = Database["public"]["Tables"]["todos"]["Row"];

type TodoContextType = {
	todoList: Todos[] | null;
	setTodoList: React.Dispatch<React.SetStateAction<Todos[]>>;
};

// Create Context
const ListContext = createContext<TodoContextType>({} as TodoContextType);

interface props {
	children: JSX.Element | JSX.Element[];
}

export const StateContext = ({ children }: props) => {
	// Add our data for the state
	const [todoList, setTodoList] = useState<Todos[]>([]);

	return (
		<ListContext.Provider value={{ todoList, setTodoList }}>
			{children}
		</ListContext.Provider>
	);
};

export const useStateContext = () => useContext(ListContext);
