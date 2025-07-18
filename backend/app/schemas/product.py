from pydantic import BaseModel
from typing import List, Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    category_id: int
    created_by: int

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    images: List[str]

    class Config:
        orm_mode = True
