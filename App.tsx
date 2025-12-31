import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import "/components/index.css";
import { TodoList } from "./components/TodoList";

export type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

export const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("tasks");

		if (saved) {
			setTodos(JSON.parse(saved));
		}
	}, []);

	const addTodo = (text: string) => {
		setTodos((prev) => {
			const newArray = [
				{ id: crypto.randomUUID(), text, completed: false },
				...prev,
			];

			localStorage.setItem("tasks", JSON.stringify(newArray));
			return newArray;
		});
	};

	const toggleTodo = (id: string) => {
		setTodos((prev) => {
			const newArray = prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			);

			localStorage.setItem("tasks", JSON.stringify(newArray));
			return newArray;
		});
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => {
			const newArray = prev.filter((todo) => todo.id !== id);

			localStorage.setItem("tasks", JSON.stringify(newArray));
			return newArray;
		});
	};

	return (
		<div>
			<TodoForm onAdd={addTodo} />
			<TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
		</div>
	);
};
