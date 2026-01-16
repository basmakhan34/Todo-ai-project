"use client";

import { useState } from "react";

export default function AddTodoForm({
  onAdd,
}: {
  onAdd: (title: string) => void;
}) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
        className="flex-1 bg-gray-900 border border-gray-700 p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 px-6 py-2 rounded">
        Add
      </button>
    </form>
  );
}