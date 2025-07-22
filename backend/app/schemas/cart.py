from pydantic import BaseModel
from typing import Optional
from app.schemas.product import ProductInCart

class CartBase(BaseModel):
    user_id: int
    product_id: int
    quantity: int = 1
    price: float
    color: Optional[str] = None
    size: Optional[str] = None

class CartCreate(CartBase):
    pass

class CartUpdate(BaseModel):
    quantity: Optional[int] = None
    color: Optional[str] = None
    size: Optional[str] = None

class CartOut(CartBase):
    id: int
    product: ProductInCart

    class Config:
        from_attributes = True
