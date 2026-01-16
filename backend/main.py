from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from backend.database import engine, init_db
from backend.models import Task
from backend.ai_agent import ask_ai
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db() 
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/todos")
async def get_todos():
    with Session(engine) as session:
        return session.exec(select(Task)).all()

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    with Session(engine) as session:
        todo = session.get(Task, todo_id)
        if not todo:
            raise HTTPException(status_code=404, detail="Not found")
        session.delete(todo)
        session.commit()
        return {"message": "Deleted"}

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    try:
        # AI Agent se response aur status dono lein
        response_text, task_created = ask_ai(request["message"])
        
        # Ab ye error nahi dega
        return {
            "response": response_text, 
            "task_created": task_created
        }
    except Exception as e:
        print(f"Chat Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))