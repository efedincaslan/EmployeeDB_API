from fastapi import FastAPI, HTTPException, Depends, APIRouter
from schemas import EmployeeCreate
from database import SessionLocal, engine, Base
from models import Employee
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:  
        yield db
    finally:
        db.close()


router = APIRouter()

@router.get("/")
def root():
    return {"message": "it works"}

@router.get("/employees")
def get_employees(db: Session = Depends(get_db)):

    employees = db.query(Employee).all()
    return employees


@router.get("/employees/search")
def search_employees(department: str, db: Session = Depends(get_db)):
    employees = db.query(Employee).filter(Employee.department == department).all()

    if not employees:
        raise HTTPException(status_code=404, detail="No employees found in that department")
    return employees

@router.get("/employees/{id}")
def get_employee(id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
    


@router.post("/employees", status_code=201)
def create_employee(EmployeeCreate : EmployeeCreate, db: Session = Depends(get_db)):
    new_employee = Employee(name=EmployeeCreate.name, department=EmployeeCreate.department)
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee


@router.delete("/employees/{id}", status_code=204)
def delete_employee(id : int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(employee)
    db.commit()

@router.put("/employees/{id}")
def update_employee(id: int, EmployeeCreate: EmployeeCreate, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    employee.name = EmployeeCreate.name
    employee.department = EmployeeCreate.department
    db.commit()
    db.refresh(employee)
    return employee