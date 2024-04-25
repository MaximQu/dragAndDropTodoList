import { useState, ChangeEvent } from "react";
import { useAppDispatch } from "../../store/store";
import { addTodo } from "../../store/slice";

const Input = () => {
	const dispatch = useAppDispatch();
	const [inputValue, setInputValue] = useState<string>("");

	const addItem = () => {
		if (inputValue === "") return;
		dispatch(addTodo(inputValue));
		setInputValue("");
	};

	const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return (
		<div className="mb-5">
			<h1 className="mb-8 text-center text-4xl">
				Let's create some todo
			</h1>
			<div className="flex">
				<label className="w-full max-w-xs border border-black">
					<input
						className="w-full bg-transparent  px-2 pb-1 pt-1.5 text-2xl outline-none placeholder:text-black/40 focus:border-b focus:border-b-black"
						onChange={handleChangeInput}
						type="text"
						name="todo"
						value={inputValue}
						placeholder="Enter your todo"
					/>
				</label>
				<button
					className="border border-l-0 border-black p-3 hover:bg-black/25 hover:text-white duration-100"
					type="button"
					onClick={addItem}
				>
					Create
				</button>
			</div>
		</div>
	);
};

export default Input;
