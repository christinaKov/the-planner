// Types
import { TodoItem } from "../types/list. d";
interface TodoItemProps {
	todoProp: TodoItem;
}

// Context
import { useStateContext } from "../lib/context";

// Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { StyledTodoBtn } from "../styles/TodoList.styled";

const TodoItem = (todoProp: TodoItemProps) => {
	const todo = todoProp.todoProp;
	const { todoList, setTodoList } = useStateContext();

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
		<li className={todo.checked ? "checked" : ""}>
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
	);
};

export default TodoItem;
