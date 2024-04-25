import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid/non-secure";
import { TodoList, TodoLists } from "../types";

const storedData = localStorage.getItem("todo");
const items =
	storedData !== null
		? JSON.parse(storedData)
		: [
				{
					id: nanoid(),
					title: "Todo",
					items: [{ id: nanoid(), body: "Learn GraphQL" }],
				},
				{
					id: nanoid(),
					title: "In Progress",
					items: [{ id: nanoid(), body: "Find a job" }],
				},
				{
					id: nanoid(),
					title: "Done",
					items: [{ id: nanoid(), body: "Room cleaning" }],
				},
		];

const initialState: TodoLists = {
	todoLists: items,
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			state.todoLists = state.todoLists.map((item) => {
				if (item.title === "Todo") {
					return {
						...item,
						items: [
							{ id: nanoid(), body: action.payload },
							...item.items,
						],
					};
				}
				return item;
			});
			localStorage.setItem("todo", JSON.stringify(state.todoLists));
		},
		removeTodo: (
			state,
			action: PayloadAction<{ listId: string; itemId: string }>,
		) => {
			state.todoLists = state.todoLists.map((listItem) => {
				if (listItem.id === action.payload.listId) {
					const newList = {
						...listItem,
						items: listItem.items.filter(
							(item) => item.id !== action.payload.itemId,
						),
					};
					return newList;
				}
				return listItem;
			});
			localStorage.setItem("todo", JSON.stringify(state.todoLists));
		},
		updateList: (state, action: PayloadAction<TodoList[]>) => {
			state.todoLists = action.payload;
			localStorage.setItem("todo", JSON.stringify(state.todoLists));
		},
		editTodoItem: (
			state,
			action: PayloadAction<{
				listId: string;
				itemId: string;
				text: string;
			}>,
		) => {
			state.todoLists = state.todoLists.map((listItem) => {
				if (listItem.id === action.payload.listId) {
					const newList = {
						...listItem,
						items: listItem.items.map((item) => {
							if (item.id === action.payload.itemId) {
								return {
									...item,
									body: action.payload.text,
								};
							}
							return item;
						}),
					};
					return newList;
				}
				return listItem;
			});
			localStorage.setItem("todo", JSON.stringify(state.todoLists));
		},
	},
});

export const { addTodo, updateList, removeTodo, editTodoItem } =
	todoSlice.actions;
export default todoSlice.reducer;
