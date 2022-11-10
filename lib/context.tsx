// Import React
import React, { createContext, useContext, useState } from "react";

// Import Types
import { TodoItem, TodoContextType } from "../types/list. d";

// Create Context
const ListContext = createContext<TodoContextType>({} as TodoContextType);

interface props {
	children: JSX.Element | JSX.Element[];
}

export const StateContext = ({ children }: props) => {
	// Add our data for the state
	const [todoList, setTodoList] = useState<TodoItem[]>([]);

	return (
		<ListContext.Provider value={{ todoList, setTodoList }}>
			{children}
		</ListContext.Provider>
	);
};

export const useStateContext = () => useContext(ListContext);
