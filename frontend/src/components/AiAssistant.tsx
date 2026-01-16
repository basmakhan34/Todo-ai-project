"use client";
import { useState } from "react";
import { postChatMessage } from "../lib/api";

export default function AiAssistant({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const handleSend = async () => {
    if (!input) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    const currentInput = input;
    setInput("");

    const data = await postChatMessage(currentInput);
    setMessages(prev => [...prev, { role: "ai", content: data.response }]);
    
    // Task created confirmation detect karke list refresh karna
    if (data.task_created) {
      onTaskCreated();
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-400">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`p-4 rounded-2xl max-w-[85%] ${m.role === "user" ? "bg-blue-600" : "bg-gray-800 border border-gray-700 text-green-300 shadow-lg"}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 bg-[#161616] p-2 rounded-xl border border-gray-800 focus-within:border-blue-500 transition">
        <input 
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-transparent p-2 flex-1 outline-none text-white"
          placeholder="Ask AI to add a task..."
        />
        <button onClick={handleSend} className="bg-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-500 active:scale-95 transition">Send</button>
      </div>
    </div>
  );
}