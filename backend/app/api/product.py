from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.product import Product
from app.schemas.product import ProductOut
from app.utils.file_handler import save_image
from app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=ProductOut)
async def create_product(
    name: str = Form(...),
    description: str = Form(""),
    price: float = Form(...),
    category_id: int = Form(...),
    created_by: int = Form(...),
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    image_urls = [save_image(image) for image in images]
    image_str = ",".join(image_urls)

    product = Product(
        name=name,
        description=description,
        price=price,
        category_id=category_id,
        created_by=created_by,
        images=image_str
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return ProductOut(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        created_by=product.created_by,
        images=image_urls
    )


@router.get("/", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(Product).all()
    result = []
    for p in products:
        result.append(ProductOut(
            id=p.id,
            name=p.name,
            description=p.description,
            price=p.price,
            category_id=p.category_id,
            created_by=p.created_by,
            images=p.images.split(",") if p.images else []
        ))
    return result


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        created_by=product.created_by,
        images=product.images.split(",") if product.images else []
    )


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"success": True, "message": "Product deleted"}
