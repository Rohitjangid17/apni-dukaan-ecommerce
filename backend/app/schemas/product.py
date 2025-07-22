from pydantic import BaseModel, field_validator
from typing import List, Optional
from app.schemas.category import CategoryOut

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = ""
    price: float
    created_by: int
    category_id: int
    weight: Optional[float] = 0
    dimensions: Optional[str] = ""
    sizes: Optional[List[str]] = []
    colors: Optional[List[str]] = []
    storage: Optional[str] = ""
    tags: Optional[List[str]] = []
    lining: Optional[str] = ""

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    product_id: int
    images: List[str]
    category: CategoryOut

    @field_validator("sizes", "colors", "tags", mode="before")
    @classmethod
    def split_comma_list(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    @field_validator("images", mode="before")
    @classmethod
    def split_images(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    class Config:
        from_attributes = True

class PaginatedProductOut(BaseModel):
    total: int
    page: int
    limit: int
    total_pages: int
    data: List[ProductOut]

    class Config:
        from_attributes = True

class ProductInCart(BaseModel):
    product_id: int
    name: str
    description: str
    price: float
    weight: float
    dimensions: str
    lining: str
    storage: str
    created_by: int
    category_id: int
    images: List[str]
    category: CategoryOut

    @field_validator("images", mode="before")
    @classmethod
    def split_images(cls, v):
        if isinstance(v, str):
            return [i.strip() for i in v.split(",") if i.strip()]
        return v

    class Config:
        from_attributes = True
