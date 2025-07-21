from pydantic import BaseModel
from typing import List, Optional

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    category_id: int
    created_by: int
    weight: Optional[float]
    dimensions: Optional[str]
    sizes: Optional[List[str]]
    colors: Optional[List[str]]
    storage: Optional[str]
    tags: Optional[List[str]]
    lining: Optional[str]

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    images: List[str]

    class Config:
        orm_mode = True

class PaginatedProductOut(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int
    data: List[ProductOut]