from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    created_by: int

class CategoryUpdate(CategoryBase):
    pass

class CategoryOut(CategoryBase):
    category_id: int
    created_by: int

    class Config:
        from_attributes = True
