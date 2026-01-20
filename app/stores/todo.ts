export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Array<{
      id: number;
      title: string;
      description: string;
      isCompleted: boolean;
      createdAt: string;
    }>,
  }),

  actions: {
    async fetchTodos() {
      try {
        const { data, error } = await useFetch("/api/todos");

        if (error.value) {
          throw new Error("Failed to fetch todos");
        }

        if (data.value) {
          this.todos = data?.value.data;
        }
      } catch (error) {
        //
        console.error("Failed to Fetch todos", error);
      }
    },

    async addTodo(todo: {
      id: number;
      title: string;
      description: string;
      isCompleted: boolean;
      createdAt: string;
    }) {
      try {
        const { data, error } = await useFetch("/api/todos", {
          method: "POST",
          body: todo,
        });

        if (error.value) {
          throw new Error("Failed to add todos");
        }

        if (data.value) {
          this.todos.push(data?.value.data);
        }
      } catch (error) {
        //
        console.error("Failed to add todos", error);
      }
    },

    async updateTodo(updatedTodo: {
      id: number;
      title: string;
      description: string;
      isCompleted: boolean;
      createdAt: string;
    }) {
      try {
        const { data, error } = await useFetch("/api/todos", {
          method: "PUT",
          body: updatedTodo,
        });
        if (error.value) {
          throw new Error("Failed to update todos");
        }
      } catch (error) {
        console.error("Failed to update todos", error);
      }
    },

    async deleteTodo(id: number) {
      try {
        const { data, error } = await useFetch("/api/todos", {
          method: "DELETE",
          body: { id },
        });
        if (error.value) {
          throw new Error("Failed to delete todos");
        }
      } catch (error) {
        console.error("Failed to delete todos", error);
      }
    },

    async updateMarkCompletedStatus(id: number) {
      const todo = this.todos.find((todo) => todo.id === id);

      if (!todo) return;

      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };

      try {
        const { data, error } = await useFetch("/api/todos", {
          method: "PUT",
          body: updatedTodo,
        });
        if (error.value) {
          throw new Error("Failed to update todos");
        }
      } catch (error) {
        console.error("Failed to update todos", error);
      }

      if (todo) {
        todo.isCompleted = !todo.isCompleted;
      }
    },
  },
});
