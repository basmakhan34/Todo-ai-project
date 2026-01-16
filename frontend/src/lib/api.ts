export const postChatMessage = async (message: string) => {
  const response = await fetch("http://127.0.0.1:8000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json(); // Isme 'response' aur 'task_created' hona chahiye
};

export const getTodos = async () => {
  const response = await fetch("http://127.0.0.1:8000/todos");
  return response.json();
};