// Types
import { TodoItem } from "../types/list. d";
interface TodoItemProps {
	todoProp: TodoItem;
	toggleChangeWrapper: (e: React.MouseEvent<HTMLElement>) => void;
	setTodoChanging: React.Dispatch<React.SetStateAction<TodoItem | undefined>>;
}

// Context
import { useStateContext } from "../lib/context";

// Styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faTrash,
	faXmark,
	faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { StyledTodoBtn } from "../styles/TodoList.styled";

const TodoItem = (props: TodoItemProps) => {
	const todo = props.todoProp;
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
				<StyledTodoBtn
					onClick={(e) => {
						props.toggleChangeWrapper(e);
						props.setTodoChanging(todo);
					}}
				>
					<FontAwesomeIcon icon={faPencil} />
				</StyledTodoBtn>
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
