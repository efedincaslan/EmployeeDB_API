# Employee API — FastAPI + Supabase

A REST API built with FastAPI and connected to a live PostgreSQL database hosted on Supabase. Includes a minimal frontend to interact with the API directly from the browser.

Built as a hands-on exercise to practice backend development, database integration, and API design.

## Tech Stack

- **FastAPI** — Python web framework for building APIs
- **PostgreSQL** — relational database hosted on Supabase
- **SQLAlchemy** — ORM for database interaction
- **Pydantic** — data validation and schema definition
- **Vanilla HTML/JS** — minimal frontend to demo API functionality

## Features

- Full CRUD operations on an employee resource
- GET all employees
- GET employee by ID
- Search employees by department
- POST to create a new employee
- PUT to update an existing employee
- DELETE an employee by ID
- Auto-generated interactive API docs at `/docs`
- Persistent data storage in a live cloud database

## Project Structure

fastapi_prac/
├── main.py          # App entry point, router registration
├── database.py      # Database connection and session management
├── models.py        # SQLAlchemy table definitions
├── schemas.py       # Pydantic request/response schemas
├── routers/
│   └── employees.py # All employee route handlers
└── static/
    ├── index.html   # Frontend UI
    └── script.js    # Fetch API calls to backend

## Running Locally

1. Clone the repo
2. Create a virtual environment and activate it
3. Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
4. Create a .env file with your database connection string
connection_string="your_supabase_connection_string"
5. Start the server
uvicorn main:app --reload
6. Visit http://127.0.0.1:8000/docs for API docs
7. Visit http://127.0.0.1:8000 for the frontend
