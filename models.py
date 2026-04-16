from sqlalchemy import Column, Integer, String
from database import Base



class Employee(Base):
    __tablename__ = "employees"  # Name of the table in the DB

    # mapped_column identifies this as a database column
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False)
    department = Column(String(30) , nullable=False)