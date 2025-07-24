from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional
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

@router.get("/filters", response_model=PaginatedProductOut)
def filter_products(
    category_id: Optional[int] = Query(None),
    colors: Optional[str] = Query(None),
    sizes: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    page: Optional[int] = Query(None, ge=1),
    limit: Optional[int] = Query(None, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Product).options(joinedload(Product.category))

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    if colors:
        query = query.filter(Product.colors.ilike(f"%{colors}%"))

    if sizes:
        query = query.filter(Product.sizes.ilike(f"%{sizes}%"))

    if min_price is not None:
        query = query.filter(Product.price >= min_price)

    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    total = query.count()

    # No pagination - return all
    if page is None or limit is None:
        products = query.all()
        return {
            "total": total,
            "page": 1,
            "limit": total,
            "total_pages": 1,
            "data": [ProductOut.from_orm(p) for p in products]
        }

    # With pagination
    skip = (page - 1) * limit
    products = query.offset(skip).limit(limit).all()
    total_pages = (total + limit - 1) // limit

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "data": [ProductOut.from_orm(p) for p in products]
    }

@router.get("/", response_model=PaginatedProductOut)
def get_all_products(
    page: Optional[int] = Query(None, ge=1),
    limit: Optional[int] = Query(None, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(Product).options(joinedload(Product.category))
    total = query.count()

    if page is None or limit is None:
        products = query.all()
        return {
            "total": total,
            "page": 1,
            "limit": total,
            "total_pages": 1,
            "data": [ProductOut.from_orm(p) for p in products]
        }

    skip = (page - 1) * limit
    total_pages = (total + limit - 1) // limit

    products = query.offset(skip).limit(limit).all()
    return {
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "data": [ProductOut.from_orm(p) for p in products]
    }


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).options(joinedload(Product.category)).filter(Product.product_id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return ProductOut.from_orm(product)

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.product_id == product_id).first()
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
    product = db.query(Product).filter(Product.product_id == product_id).first()
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
