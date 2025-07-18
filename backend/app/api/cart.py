from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import SessionLocal
from app.models.cart import Cart
from app.schemas.cart import CartCreate, CartUpdate, CartOut

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=CartOut)
def add_to_cart(payload: CartCreate, db: Session = Depends(get_db)):
    cart_item = Cart(**payload.dict())
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.get("/", response_model=List[CartOut])
def get_all_cart_items(db: Session = Depends(get_db)):
    return db.query(Cart).all()

@router.get("/user/{user_id}", response_model=List[CartOut])
def get_cart_by_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(Cart).filter(Cart.user_id == user_id).all()

@router.put("/{cart_id}", response_model=CartOut)
def update_cart(cart_id: int, payload: CartUpdate, db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    for key, value in payload.dict(exclude_unset=True).items():
        setattr(cart_item, key, value)

    db.commit()
    db.refresh(cart_item)
    return cart_item

@router.delete("/{cart_id}")
def delete_cart(cart_id: int, db: Session = Depends(get_db)):
    cart_item = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    db.delete(cart_item)
    db.commit()
    return {"success": True, "message": "Cart item removed"}
