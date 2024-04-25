import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import Input from "./components/Input";
import TodoItem from "./components/TodoItem";
import { updateList } from "./store/slice";
import { RootState, useAppDispatch } from "./store/store";

const App = () => {
	const { todoLists } = useSelector((state: RootState) => state.todoSlice);
	const dispatch = useAppDispatch();

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result;
		if (!destination) return;

		const sourceList = todoLists.find(
			(list) => list.id === source.droppableId,
		);
		const destinationList = todoLists.find(
			(list) => list.id === destination.droppableId,
		);
		const currentItem = sourceList?.items.find(
			(item) => item.id === draggableId,
		);

		if (!destinationList || !currentItem || !sourceList) return;

		if (destination.droppableId === source.droppableId) {
			if (destination.index === source.index) return;
			dispatch(
				updateList(
					todoLists.map((list) => {
						if (list.id === destinationList.id) {
							const itemsCopy = [...list.items];
							itemsCopy.splice(source.index, 1);
							itemsCopy.splice(destination.index, 0, currentItem);

							return {
								...list,
								items: itemsCopy,
							};
						}
						return list;
					}),
				),
			);
			return;
		}

		const boardCopy = {
			...destinationList,
			items: [currentItem, ...destinationList.items],
		};

		const newCurrList = {
			...sourceList,
			items: sourceList.items.filter(
				(item) => item.id !== currentItem.id,
			),
		};

		dispatch(
			updateList(
				todoLists.map((list) => {
					if (list.id === boardCopy.id) {
						return boardCopy;
					}
					if (list.id === newCurrList.id) {
						return newCurrList;
					}
					return list;
				}),
			),
		);
	};

	return (
		<div className="bg-gradient min-h-[100dvh] py-3">
			<div className="container flex flex-col items-center ">
				<Input />
				<div className="grid w-full max-w-6xl grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
					<DragDropContext onDragEnd={onDragEnd}>
						{todoLists.map((list) => (
							<div key={list.id} className="bg-white/30 p-3">
								<h2 className="mb-4 text-2xl">{list.title}</h2>
								<Droppable droppableId={list.id}>
									{(provided) => (
										<ul
											ref={provided.innerRef}
											{...provided.droppableProps}
											className={twMerge(
												"todoList",
												list.items.length === 0 &&
													"relative border-2 border-dashed border-black before:absolute before:inset-0 before:m-auto before:h-1.5 before:w-6 before:bg-black after:absolute after:inset-0 after:m-auto after:h-6 after:w-1.5 after:bg-black",
											)}
										>
											{list.items.map((item, index) => (
												<Draggable
													draggableId={item.id}
													key={item.id}
													index={index}
												>
													{(provided) => (
														<li
															key={item.id}
															className="todoItem"
															ref={
																provided.innerRef
															}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<TodoItem
																item={item}
																listId={list.id}
																index={index}
															/>
														</li>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</ul>
									)}
								</Droppable>
							</div>
						))}
					</DragDropContext>
				</div>
			</div>
		</div>
	);
};

export default App;
