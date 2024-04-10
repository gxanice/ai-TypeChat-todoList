import { ref } from "vue";

interface Todo {
  id: string;
  title: string;
  content: string;
}

export const todoS = ref<Todo[]>([]);

let id = 0;
export function addTodo(title: string) {
  todoS.value.push({
    id: String(id++),
    title,
    content: "",
  });
}

export function removeTodo(id: string) {
  todoS.value = todoS.value.filter((t) => t.id !== id);
}

export function changeTodoTitle(id: string, newTitle: string) {
  const todo = todoS.value.find((t) => t.id === id);

  if (!todo) {
    console.error(`找不到 todo: ${id}`);
    return;
  }

  todo.title = newTitle;
}
