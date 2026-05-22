import { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import "/components/index.css";
import { TodoList } from "./components/TodoList";

const STORAGE_KEY = "tasks";

export type Todo = {
	id: string;
	text: string;
	completed: boolean;
};

const isTodo = (value: unknown): value is Todo => {
	if (!value || typeof value !== "object") {
		return false;
	}

	const todo = value as Record<string, unknown>;

	return (
		typeof todo.id === "string" &&
		typeof todo.text === "string" &&
		typeof todo.completed === "boolean"
	);
};

const loadTodos = (): Todo[] => {
	const saved = localStorage.getItem(STORAGE_KEY);

	if (!saved) {
		return [];
	}

	try {
		const parsed: unknown = JSON.parse(saved);

		if (Array.isArray(parsed)) {
			return parsed.filter(isTodo);
		}
	} catch {
		localStorage.removeItem(STORAGE_KEY);
	}

	return [];
};

export const App = () => {
	const [todos, setTodos] = useState<Todo[]>(loadTodos);

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}, [todos]);

	const addTodo = (text: string) => {
		setTodos((prev) => [
			{ id: crypto.randomUUID(), text, completed: false },
			...prev,
		]);
	};

	const toggleTodo = (id: string) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const deleteTodo = (id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};

	return (
		<div>
			<TodoForm onAdd={addTodo} />
			<TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
		</div>
	);
};
