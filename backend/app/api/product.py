from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.models.product import Product
from app.schemas.product import ProductOut, PaginatedProductOut
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
    weight: float = Form(None),
    dimensions: str = Form(None),
    sizes: str = Form(None),
    colors: str = Form(None),
    storage: str = Form(None),
    tags: str = Form(None),
    lining: str = Form(None),
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
        images=image_str,
        weight=weight,
        dimensions=dimensions,
        sizes=sizes,
        colors=colors,
        storage=storage,
        tags=tags,
        lining=lining
    )

    db.add(product)
    db.commit()
    db.refresh(product)
    db.refresh(product.category)

    return ProductOut.from_orm(product)

@router.get("/", response_model=PaginatedProductOut)
def get_all_products(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    total = db.query(Product).count()
    total_pages = (total + limit - 1) // limit

    products = db.query(Product).options(joinedload(Product.category)).offset(skip).limit(limit).all()
    result = [ProductOut.from_orm(p) for p in products]

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "data": result
    }

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).options(joinedload(Product.category)).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return ProductOut.from_orm(product)

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
    return {"success": True, "message": "Product deleted"}

@router.put("/{product_id}", response_model=ProductOut)
async def update_product(
    product_id: int,
    name: str = Form(...),
    description: str = Form(""),
    price: float = Form(...),
    category_id: int = Form(...),
    created_by: int = Form(...),
    weight: float = Form(None),
    dimensions: str = Form(None),
    sizes: str = Form(None),
    colors: str = Form(None),
    storage: str = Form(None),
    tags: str = Form(None),
    lining: str = Form(None),
    images: List[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if images:
        image_urls = [save_image(image) for image in images]
        product.images = ",".join(image_urls)

    product.name = name
    product.description = description
    product.price = price
    product.category_id = category_id
    product.created_by = created_by
    product.weight = weight
    product.dimensions = dimensions
    product.sizes = sizes
    product.colors = colors
    product.storage = storage
    product.tags = tags
    product.lining = lining

    db.commit()
    db.refresh(product)
    db.refresh(product.category)

    return ProductOut.from_orm(product)
