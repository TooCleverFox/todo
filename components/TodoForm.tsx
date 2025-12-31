import { useState } from "react";

type Props = {
	onAdd: (text: string) => void;
};

export const TodoForm = ({ onAdd }: Props) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState("");

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		if (!value.trim()) {
			setError("Поле не может быть пустым");
			return;
		}

		onAdd(value.trim());
		setValue("");
		setError("");
	};
	return (
		<form id="new-task" onSubmit={submitHandler}>
			<div className="input-wrapper">
				<input
					type="text"
					placeholder="Task to be done..."
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						if (error) setError("");
					}}
				/>
				{error && <div className="error">{error}</div>}
			</div>

			<button type="submit">Add</button>
		</form>
	);
};
