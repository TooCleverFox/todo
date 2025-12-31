import type { Todo } from "../App";
import { TodoItem } from "./TodoItem";

type Props = {
	todos: Todo[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
};

export const TodoList = ({ todos, onToggle, onDelete }: Props) => {
	return (
		<div id="tasks">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};
