"use client";

type Task = {
  id: number;
  task: string;
  completed: boolean;
};

export default function TodoItem({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 border border-gray-800 rounded-lg shadow-md hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-4">
        <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.task}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition-all"
      >
        Delete
      </button>
    </div>
  );
}
