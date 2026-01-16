const API_URL = "http://127.0.0.1:8000";

export async function getTodos() {
  const res = await fetch(`${API_URL}/todos`);
  return res.json();
}

export async function deleteTodo(id: number) {
  await fetch(`${API_URL}/todos/${id}`, { method: "DELETE" });
}

export async function postChatMessage(message: string) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
}