// React
import React, { useEffect, useRef, useState } from "react";

// Import Context
import { useStateContext } from "../lib/context";

// Import Types
import { Database } from "../types/supabase";
type Todo = Database["public"]["Tables"]["todos"]["Row"];

// Supabase
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<any, "public", any>;
if (supabaseUrl && supabaseKey)
	supabase = createClient(supabaseUrl, supabaseKey);

// Supabase User
import { useUser } from "@supabase/auth-helpers-react";

//Styles
import {
	StyledWrapper,
	StyledInputWrapper,
	StyledTodoList,
	ChangeTodoWrapper,
} from "../styles/TodoList.styled";

// Components
import TodoItemComponent from "./TodoItem";

export default function TodoList() {
	const user = useUser();
	const { todoList, setTodoList } = useStateContext();

	const inputRef = useRef<HTMLInputElement>(null);

	// Set TodoList
	useEffect(() => {
		if (user)
			(async () => {
				let { data: todos, error } = await supabase
					.from("todos")
					.select("*")
					.eq("user_id", user?.id);
				if (todos)
					setTodoList(
						todos.sort((a, b) => {
							return a.id - b.id;
						})
					);
			})();
	}, [user]);

	// Handle Changing
	const [isChanging, setIsChanging] = useState(false);
	const [todoChanging, setTodoChanging] = useState<Todo | undefined>(undefined);
	const [newTitle, setNewTitle] = useState("");

	const [newTodo, setNewTodo] = useState("");
	const newInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTodo(e.target.value);
	};

	const addTodo = async (
		e: React.FormEvent<HTMLFormElement>,
		newTodo: string
	) => {
		e.preventDefault();

		if (newTodo) {
			const { data, error } = await supabase
				.from("todos")
				.insert([{ title: newTodo, checked: false, user_id: user?.id }]);
			setNewTodo("");
		}
	};

	const toggleChangeWrapper = (e: React.MouseEvent<HTMLElement>) => {
		if (e.target !== inputRef.current) setIsChanging(!isChanging);
	};

	const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.target.value);
	};

	const changeTodo = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const currentId = todoChanging?.id;

		if (todoChanging) {
			const { data: todos, error } = await supabase
				.from("todos")
				.update({ title: newTitle })
				.eq("id", currentId);

			const newList = [...todoList];
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
					todoList.map((todo: Todo) => (
						<TodoItemComponent
							todoProp={todo}
							toggleChangeWrapper={toggleChangeWrapper}
							setTodoChanging={setTodoChanging}
							setNewTitle={setNewTitle}
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
