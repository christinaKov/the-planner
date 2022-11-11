// React
import { useEffect, useState } from "react";

// Import Context
import { TodoItem } from "../types/list. d";
import { useStateContext } from "../lib/context";

//Styles
import {
	StyledWrapper,
	StyledInputWrapper,
	StyledTodoList,
} from "../styles/TodoList.styled";

// Ids
import { v4 as uuidv4 } from "uuid";

// Components
import TodoItemComponent from "./TodoItem";

export default function TodoList() {
	const { todoList, setTodoList } = useStateContext();
	const [firstLoad, setFirstLoad] = useState(true);

	useEffect(() => {
		if (!firstLoad) localStorage.setItem("todos", JSON.stringify(todoList));
	}, [todoList]);

	useEffect(() => {
		const currentTodos = localStorage.getItem("todos");
		if (currentTodos) setTodoList(JSON.parse(currentTodos));
		setFirstLoad(false);
	}, []);

	const [newTodo, setNewTodo] = useState("");
	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo(e.target.value);
	};

	const addTodo = (e: React.FormEvent<HTMLFormElement>, newTodo: string) => {
		e.preventDefault();
		setTodoList([
			...todoList,
			{ id: uuidv4(), title: newTodo, checked: false },
		]);
		setNewTodo("");
		localStorage.setItem("todos", JSON.stringify(todoList));
	};

	return (
		<StyledWrapper>
			<StyledInputWrapper onSubmit={(e) => addTodo(e, newTodo)}>
				<input value={newTodo} onChange={inputHandler} type="text"></input>
				<button type="submit">Add</button>
			</StyledInputWrapper>
			<StyledTodoList>
				{todoList &&
					todoList.map((todo: TodoItem) => (
						<TodoItemComponent todoProp={todo} key={todo.id} />
					))}
			</StyledTodoList>
		</StyledWrapper>
	);
}
