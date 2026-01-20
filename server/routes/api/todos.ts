import { defineEventHandler, readBody } from "h3";

const todos = [
  {
    id: 1,
    title: "Sample Todo",
    description: "This is a sample todo",
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
];

export default defineEventHandler(async (event) => {
  const { req, res } = event;

  // Get All Todos
  if (req.method === "GET") {
    return { success: true, data: todos };
  }

  // Add New Todo
  if (req.method === "POST") {
    const newTodo = await readBody(event);
    todos.push(newTodo);

    return {
      success: true,
      data: newTodo,
      statusCode: 201,
    };
  }

  // Update Existing Todo
  if (req.method === "PUT") {
    const updatedTodo = await readBody(event);
    const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (todoIndex !== -1) {
      todos[todoIndex] = updatedTodo;
      return {
        success: true,
        value: updatedTodo,
        statusCode: 201,
      };
    }

    return {
      statusCode: 404,
    };
  }

  // Delete Existing Todo
  if (req.method === "DELETE") {
    const { id } = await readBody(event);
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);

      return {
        success: true,
        statusCode: 204,
      };
    }
  }

  return { error: "Invalid method" };
});
