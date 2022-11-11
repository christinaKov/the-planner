// React
import React, { useEffect, useRef, useState } from "react";

// Import Context
import { TodoItem } from "../types/list. d";
import { useStateContext } from "../lib/context";

//Styles
import {
	StyledWrapper,
	StyledInputWrapper,
	StyledTodoList,
	ChangeTodoWrapper,
} from "../styles/TodoList.styled";

// Ids
import { v4 as uuidv4 } from "uuid";

// Components
import TodoItemComponent from "./TodoItem";

export default function TodoList() {
	const { todoList, setTodoList } = useStateContext();
	const [firstLoad, setFirstLoad] = useState(true);

	const inputRef = useRef<HTMLInputElement>(null);

	// Handle Changing
	const [isChanging, setIsChanging] = useState(false);
	const [todoChanging, setTodoChanging] = useState<TodoItem | undefined>(
		undefined
	);
	const [newTitle, setNewTitle] = useState("");

	useEffect(() => {
		if (!firstLoad) localStorage.setItem("todos", JSON.stringify(todoList));
	}, [todoList]);

	useEffect(() => {
		const currentTodos = localStorage.getItem("todos");
		if (currentTodos) setTodoList(JSON.parse(currentTodos));
		setFirstLoad(false);
	}, []);

	const [newTodo, setNewTodo] = useState("");
	const newInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

	const toggleChangeWrapper = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== inputRef.current) setIsChanging(!isChanging);
	};

	const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const changeTodo = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newList = [...todoList];
		if (todoChanging) {
			newList[todoList.indexOf(todoChanging)].title = newTitle;
			setTodoList(newList);
			setNewTitle("");
			setIsChanging(!isChanging);
		}
	};

	return (
		<StyledWrapper>
			<StyledInputWrapper onSubmit={(e) => addTodo(e, newTodo)}>
				<input value={newTodo} onChange={newInputHandler} type="text"></input>
				<button type="submit">Add</button>
			</StyledInputWrapper>
			<StyledTodoList>
				{todoList &&
					todoList.map((todo: TodoItem) => (
						<TodoItemComponent
							todoProp={todo}
							toggleChangeWrapper={toggleChangeWrapper}
							setTodoChanging={setTodoChanging}
							key={todo.id}
						/>
					))}
			</StyledTodoList>
			{isChanging && (
				<ChangeTodoWrapper onSubmit={changeTodo} onClick={toggleChangeWrapper}>
					<input
						onChange={changeInputHandler}
						value={newTitle}
						ref={inputRef}
						type="text"
					/>
				</ChangeTodoWrapper>
			)}
		</StyledWrapper>
	);
}
