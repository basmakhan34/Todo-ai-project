# backend/main.py
from typing import List
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select # 'select' add kiya hai
from database import get_session, init_db
from models import User, Task
from auth import get_password_hash, login, Token, get_current_user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.post("/signup")
def signup(user: User, db: Session = Depends(get_session)):
    # Check if user already exists
    statement = select(User).where(User.email == user.email)
    db_user = db.exec(statement).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    print(f"--- Signup Debug ---")
    print(f"Received plain password: {user.hashed_password}")
    # Hash password and save
    hashed_pass = get_password_hash(user.hashed_password)
    print(f"Hashed password to be stored: {hashed_pass}")
    user.hashed_password = hashed_pass
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created successfully"}

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_session)):
    print(f"--- Token Debug ---")
    print(f"Received username: {form_data.username}")
    print(f"Received password: {form_data.password}")
    # Result ko await karna zaroori hai
    result = await login(form_data, db)
    return result

@app.post("/todos/", response_model=Task)
def create_todo(
    task: Task,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    task.user_id = current_user.id
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@app.get("/todos/", response_model=List[Task])
def read_todos(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    todos = db.exec(
        select(Task).where(Task.user_id == current_user.id)
    ).all()
    return todos

@app.get("/todos/{task_id}", response_model=Task)
def read_todo(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    return task

@app.put("/todos/{task_id}", response_model=Task)
def update_todo(
    task_id: int,
    task: Task,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    existing_task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to edit it")
    
    existing_task.title = task.title
    existing_task.description = task.description
    existing_task.completed = task.completed
    existing_task.updated_at = datetime.utcnow()
    
    db.add(existing_task)
    db.commit()
    db.refresh(existing_task)
    return existing_task

@app.delete("/todos/{task_id}")
def delete_todo(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session)
):
    task = db.exec(
        select(Task).where(Task.id == task_id, Task.user_id == current_user.id)
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found or you don't have permission to delete it")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}