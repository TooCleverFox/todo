import type { Todo } from "../App";

type Props = {
	todo: Todo;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
	return (
		<div className={`task ${todo.completed ? "completed" : ""}`}>
			<input
				className="task-checkbox"
				type="checkbox"
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
			/>
			<span className="task-text">{todo.text}</span>
			<button
				type="button"
				className="delete"
				onClick={() => onDelete(todo.id)}
			>
				<i className="fa-solid fa-trash-can"></i>
			</button>
		</div>
	);
};
