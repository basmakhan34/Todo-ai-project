"use client";
import TodoItem from "./TodoItem";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export default function TodoList({ tasks, onDelete }: { tasks: Task[], onDelete: (id: number) => void }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500 mt-10 text-center">No tasks available. Add one or ask the AI!</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {tasks.map((t) => (
        <TodoItem key={t.id} task={t} onDelete={onDelete} />
      ))}
    </div>
  );
}
