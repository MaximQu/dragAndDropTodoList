import React, { FC, useState, useRef, useEffect } from "react";
import { Todo } from "../../types";
import { useAppDispatch } from "../../store/store";
import { editTodoItem, removeTodo } from "../../store/slice";
import { twMerge } from "tailwind-merge";

type TodoItemProps = {
	item: Todo;
	index: number;
	listId: string;
};

const TodoItem: FC<TodoItemProps> = ({ item, index, listId }) => {
	const textRef = useRef<HTMLParagraphElement | null>(null);
	const [isEditable, setIsEditable] = useState(false);
	const dispatch = useAppDispatch();

	const handleEditTodoText = () => {
		if (textRef.current === null) return;
		if (isEditable) {
			dispatch(
				editTodoItem({
					listId,
					itemId: item.id,
					text: textRef.current.innerText,
				}),
			);
			setIsEditable(false);
		} else {
			setIsEditable(true);
		}
	};

	useEffect(() => {
		if (isEditable && textRef.current !== null) {
			textRef.current.focus();
		}
	}, [isEditable]);

	return (
		<React.Fragment key={item.id}>
			<div className="flex">
				<span>{index + 1}. &nbsp;</span>
				<p
					className={twMerge(
						"outline-none lg:max-w-[15.5rem] max-w-[13rem] overflow-hidden",
						isEditable && "cursor-auto border-b border-black",
					)}
					contentEditable={isEditable}
                    suppressContentEditableWarning={true}
					ref={textRef}
				>
					{item.body}
				</p>
			</div>
			<div className="flex gap-2">
				<button type="button" onClick={handleEditTodoText}>
					{isEditable ? (
						<svg
							viewBox="0 0 512 512"
							fill="currentColor"
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-6 w-6"
						>
							<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
						</svg>
					)}
				</button>
				<button
					type="button"
					onClick={() =>
						dispatch(removeTodo({ listId, itemId: item.id }))
					}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="h-5 w-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
				</button>
			</div>
		</React.Fragment>
	);
};

export default TodoItem;
