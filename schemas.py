
from pydantic import BaseModel

class EmployeeCreate(BaseModel):
    #id will be auto incremented and will not be provided by the user
    name: str   
    department: str 