import Modal from "./page-components/Modal";
import TodoList from "./page-components/TodoList";
import { getAllTodos } from "@/api";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <main className="max-w-2xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <Modal />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
