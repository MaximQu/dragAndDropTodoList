import React, { ElementRef, FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { editTodoItem, removeTodo } from "../../store/slice";
import { useAppDispatch } from "../../store/store";
import { Todo } from "../../types";
import { BinIcon, PenIcon, TickIcon } from "../../ui/icons";

type TodoItemProps = {
	item: Todo;
	index: number;
	listId: string;
};

const TodoItem: FC<TodoItemProps> = ({ item, index, listId }) => {
	const textRef = useRef<ElementRef<"p"> | null>(null);
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
						"max-w-[13rem] overflow-hidden outline-none lg:max-w-[15.5rem]",
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
					{isEditable ? <PenIcon /> : <TickIcon />}
				</button>
				<button
					type="button"
					onClick={() =>
						dispatch(removeTodo({ listId, itemId: item.id }))
					}
				>
					<BinIcon />
				</button>
			</div>
		</React.Fragment>
	);
};

export default TodoItem;
