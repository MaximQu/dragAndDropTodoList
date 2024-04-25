export type Todo = {
	id: string;
	body: string;
};

export type TodoList = {
	id: string;
	title: string;
	items: Todo[];
};

export type TodoLists = {
	todoLists: TodoList[];
};
