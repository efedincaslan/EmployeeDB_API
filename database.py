from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()
database_url = os.environ.get("connection_string")

if not database_url:
    raise ValueError("DATABASE_URL not found in environment variables")

engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

with engine.connect() as connection:
    print("Successfully connected to the database!")