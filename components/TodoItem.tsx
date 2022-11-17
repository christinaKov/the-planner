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
import { StyledTodoBtn, StyledTodoBtns } from "../styles/TodoList.styled";

// Supabase
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
let supabase: SupabaseClient<any, "public", any>;
if (supabaseUrl && supabaseKey)
	supabase = createClient(supabaseUrl, supabaseKey);

// Supabase User
import { useUser } from "@supabase/auth-helpers-react";

const TodoItem = (props: TodoItemProps) => {
	const user = useUser();
	const todo = props.todoProp;
	const { fetchTodos } = useStateContext();

	const removeTodo = async (todoToRemove: Todo) => {
		const { data, error } = await supabase
			.from("todos")
			.delete()
			.eq("id", todoToRemove.id);
		fetchTodos(user?.id);
	};

	const toggleCheck = async (todoChecked: Todo) => {
		const { data: todos, error } = await supabase
			.from("todos")
			.update({ checked: !todoChecked.checked })
			.eq("id", todoChecked.id);
		fetchTodos(user?.id);
	};

	return (
		<li className={todo.checked ? "checked" : ""}>
			<p
				onClick={(e) => {
					props.toggleChangeWrapper(e);
					props.setTodoChanging(todo);
					props.setNewTitle(todo.title);
				}}
			>
				{todo.title}
			</p>
			<StyledTodoBtns>
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
			</StyledTodoBtns>
		</li>
	);
};

export default TodoItem;
