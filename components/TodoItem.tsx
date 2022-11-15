// Types
import { Database } from "../types/supabase";
type Todo = Database["public"]["Tables"]["todos"]["Row"];
interface TodoItemProps {
	setNewTitle(title: any): unknown;
	todoProp: Todo;
	toggleChangeWrapper: (e: React.MouseEvent<HTMLElement>) => void;
	setTodoChanging: React.Dispatch<React.SetStateAction<Todo | undefined>>;
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

// Supabase
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<any, "public", any>;
if (supabaseUrl && supabaseKey)
	supabase = createClient(supabaseUrl, supabaseKey);

const TodoItem = (props: TodoItemProps) => {
	const todo = props.todoProp;
	const { todoList, setTodoList } = useStateContext();

	const removeTodo = async (todoToRemove: Todo) => {
		const { data, error } = await supabase
			.from("todos")
			.delete()
			.eq("id", todoToRemove.id);

		setTodoList([...todoList].filter((todo) => todo !== todoToRemove));
	};

	const toggleCheck = async (todoChecked: Todo) => {
		const { data: todos, error } = await supabase
			.from("todos")
			.update({ checked: !todoChecked.checked })
			.eq("id", todoChecked.id);

		const newList = [...todoList];
		newList[todoList.indexOf(todoChecked)].checked = true;
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
						props.setNewTitle(todo.title);
					}}
				>
					<FontAwesomeIcon icon={faPencil} />
				</StyledTodoBtn>
				{!todo.checked && (
					<StyledTodoBtn onClick={() => toggleCheck(todo)}>
						<FontAwesomeIcon icon={faCheck} />
					</StyledTodoBtn>
				)}
				{todo.checked && (
					<StyledTodoBtn onClick={() => toggleCheck(todo)}>
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
