import os
import json
from groq import Groq
from sqlmodel import Session, select
from backend.database import engine
from backend.models import Task, Message
from dotenv import load_dotenv

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def add_task_to_db(task_text: str):
    """Adds a task using the correct 'task' column."""
    with Session(engine) as session:
        new_task = Task(task=task_text, completed=False, user_id=1)
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return f"Done! I've added '{task_text}' to your list. ✅"

def get_chat_history(conversation_id: int):
    with Session(engine) as session:
        statement = select(Message).where(Message.conversation_id == conversation_id).order_by(Message.id)
        results = session.exec(statement).all()
        return [{"role": m.role, "content": m.content} for m in results]

def save_message(conversation_id: int, role: str, content: str):
    with Session(engine) as session:
        new_msg = Message(conversation_id=conversation_id, role=role, content=content)
        session.add(new_msg)
        session.commit()

def ask_ai(user_input: str, conversation_id: int = 1):
    history = get_chat_history(conversation_id)
    
    messages = [{"role": "system", "content": "You are a Todo AI. Use the add_task_to_db tool to save tasks. Always confirm with a friendly text after adding."}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_input})
    
    tools = [{
        "type": "function",
        "function": {
            "name": "add_task_to_db",
            "description": "Add a new todo task.",
            "parameters": {
                "type": "object",
                "properties": {
                    "task_text": {"type": "string", "description": "The task description."}
                },
                "required": ["task_text"]
            }
        }
    }]

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        tools=tools,
        tool_choice="auto"
    )

    response_message = response.choices[0].message
    final_text = ""
    task_created = False

    if response_message.tool_calls:
        for tool_call in response_message.tool_calls:
            if tool_call.function.name == "add_task_to_db":
                args = json.loads(tool_call.function.arguments)
                task_text = args.get("task_text")
                if task_text:
                    # Tool chalao aur friendly text hasil karo
                    final_text = add_task_to_db(task_text)
                    task_created = True
    else:
        final_text = response_message.content if response_message.content else "How can I assist you?"

    save_message(conversation_id, "user", user_input)
    save_message(conversation_id, "assistant", final_text)
    
    
    return final_text, task_created