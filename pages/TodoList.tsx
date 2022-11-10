// React
import { useEffect, useState } from "react";

// Import Context
import { TodoItem, TodoContextType } from "../types/list. d";
import { useStateContext } from "../lib/context";

//Styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

// Ids
import { v4 as uuidv4 } from "uuid";

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

	const removeTodo = (todoToRemove: TodoItem) => {
		setTodoList([...todoList].filter((todo) => todo !== todoToRemove));
	};

	const checkTodo = (todoChecked: TodoItem) => {
		const newList = [...todoList];
		newList[todoList.indexOf(todoChecked)].checked = true;
		setTodoList(newList);
	};

	const uncheckTodo = (todoChecked: TodoItem) => {
		const newList = [...todoList];
		newList[todoList.indexOf(todoChecked)].checked = false;
		setTodoList(newList);
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
						<li className={todo.checked ? "checked" : ""} key={todo.id}>
							<p>{todo.title}</p>
							<div>
								{!todo.checked && (
									<StyledTodoBtn onClick={() => checkTodo(todo)}>
										<FontAwesomeIcon icon={faCheck} />
									</StyledTodoBtn>
								)}
								{todo.checked && (
									<StyledTodoBtn onClick={() => uncheckTodo(todo)}>
										<FontAwesomeIcon icon={faXmark} />
									</StyledTodoBtn>
								)}
								<StyledTodoBtn onClick={() => removeTodo(todo)}>
									<FontAwesomeIcon icon={faTrash} />
								</StyledTodoBtn>
							</div>
						</li>
					))}
			</StyledTodoList>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	width: 50vw;
	height: 90vh;
	background: #f1f1f1;
	border-radius: 0.5vw;
	overflow: auto;
	border: 0.01vw black solid;
`;

const StyledInputWrapper = styled.form`
	display: flex;
	input {
		width: 80%;
	}
	button {
		background: black;
		color: #f1f1f1;
	}
	input,
	button {
		padding: 1rem 2rem;
		border: none;
		border-top: none;
		outline: none;
		font-size: 1.5rem;
	}
`;

const StyledTodoList = styled.ul`
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.01vw black solid;
	}
	li.checked {
		text-decoration: line-through;
	}
`;

const StyledTodoBtn = styled.button`
	width: 4vw;
	height: 4vw;
`;
