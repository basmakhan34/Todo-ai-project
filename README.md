# 🤖 Agentic AI Todo Workspace - Phase 3

A next-generation, AI-native task management system where you don't just write tasks—you chat with them. Powered by FastAPI, Next.js, and Llama 3.3.

## 🚀 Phase 3 Features
- **AI Agentic Power**: Natural language task management using Groq & Llama 3.
- **Modern Dashboard**: Professional dark-themed UI with a functional sidebar.
- **Smart Filtering**: View All, Completed, or Deleted tasks via sidebar navigation.
- **Real-time Sync**: Dashboard updates instantly when the AI agent adds a task.
- **Secure Access**: Authentication guard to protect your workspace.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Lucide Icons.
- **Backend**: FastAPI (Python), SQLModel, SQLite.
- **AI**: Groq API (Llama 3.3 Model).

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
# Create a .env file and add your GROQ_API_KEY
uvicorn main:app --reload
