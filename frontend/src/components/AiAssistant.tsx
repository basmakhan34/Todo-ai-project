"use client";
import { useState } from "react";
import { postChatMessage } from "../lib/api";
import { Send, Sparkles } from "lucide-react";

// Props interface define karein
interface AiAssistantProps {
  onTaskCreated?: () => void;
}

export default function AiAssistant({ onTaskCreated }: AiAssistantProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const data = await postChatMessage(userMsg);
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      
      // Agar backend se task_created True aaya toh list refresh karo
      if (data.task_created && onTaskCreated) {
        onTaskCreated();
      }
    } catch (err) {
      console.error("AI Error:", err);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 italic text-sm">
            <Sparkles size={24} className="mb-2 opacity-20" />
            Ask me to add a task...
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-gray-500 animate-pulse ml-2">Agent is thinking...</div>}
      </div>
      
      {/* Input Area */}
      <div className="relative group">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Message AI Agent..."
          className="w-full bg-white/5 border border-white/10 p-4 pr-14 rounded-2xl outline-none focus:border-blue-500/50 transition-all text-sm placeholder:text-gray-600"
        />
        <button 
          onClick={handleSend}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}