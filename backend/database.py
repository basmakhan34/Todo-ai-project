import os
from sqlmodel import create_engine, Session, SQLModel

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    engine = create_engine(DATABASE_URL, echo=False)
else:
    # Use a local SQLite database as a fallback
    DATABASE_URL = "sqlite:///database.db"
    engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})

# Is function ka naam init_db kar diya hai
def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session