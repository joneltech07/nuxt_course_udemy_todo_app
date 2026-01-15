import SecureLS from "secure-ls";

export const useTodoStore = defineStore('todo', {
	state: () => ({
		todos: [] as Array<{
			id: number;
			title: string;
			description: string;
			isCompleted: boolean,
			createdAt: string
		}>,
	}),

	getters: {
		getTodoById: (state) => {
			return (id: number) => state.todos.find((todo) => todo.id === id);
		},
	},

	actions: {
		addTodo(todo: { id: number; title: string; description: string; isCompleted: boolean, createdAt: string }) {
			this.todos.push(todo);
		},

		updateTodo(updatedTodo: { id: number; title: string; description: string; isCompleted: boolean, createdAt: string }) {
			const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
			if (index !== -1) {
				this.todos[index] = updatedTodo;
			}
		},

		deleteTodo(id: number) {
			this.todos = this.todos.filter((todo) => todo.id !== id);
		},

		updateMarkCompletedStatus(id: number) {
			const todo = this.todos.find((todo) => todo.id === id);

			if (todo) {
				todo.isCompleted = !todo.isCompleted;
			}
		},
	},

	persist: {
		storage: {
			getItem: (key: string) => {
				return new SecureLS({
					encodingType: 'aes',
					encryptionSecret: '@abc12345nuxtjscourse'
				}).get(key);
			},
			setItem: (key: string, value: string) => {
				return new SecureLS({
					encodingType: 'aes',
					encryptionSecret: '@abc12345nuxtjscourse'
				}).set(key, value);
			},
		}
	}
});