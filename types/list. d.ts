export interface TodoItem {
	id: string;
	title: string;
	checked: boolean;
}
export type TodoContextType = {
	todoList: TodoItem[];
	setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};
