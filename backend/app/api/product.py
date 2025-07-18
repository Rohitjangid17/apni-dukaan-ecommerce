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

    return ProductOut(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        created_by=product.created_by,
        images=image_urls,
        weight=product.weight,
        dimensions=product.dimensions,
        sizes=product.sizes.split(",") if product.sizes else [],
        colors=product.colors.split(",") if product.colors else [],
        storage=product.storage,
        tags=product.tags.split(",") if product.tags else [],
        lining=product.lining
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
            images=p.images.split(",") if p.images else [],
            weight=p.weight,
            dimensions=p.dimensions,
            sizes=p.sizes.split(",") if p.sizes else [],
            colors=p.colors.split(",") if p.colors else [],
            storage=p.storage,
            tags=p.tags.split(",") if p.tags else [],
            lining=p.lining
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
        images=product.images.split(",") if product.images else [],
        weight=product.weight,
        dimensions=product.dimensions,
        sizes=product.sizes.split(",") if product.sizes else [],
        colors=product.colors.split(",") if product.colors else [],
        storage=product.storage,
        tags=product.tags.split(",") if product.tags else [],
        lining=product.lining
    )


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
    images: List[UploadFile] = File(None),  # Optional: update only if provided
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # Handle image update (replace only if new images are provided)
    if images:
        image_urls = [save_image(image) for image in images]
        product.images = ",".join(image_urls)
    image_urls = product.images.split(",") if product.images else []

    # Update fields
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

    return ProductOut(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        category_id=product.category_id,
        created_by=product.created_by,
        images=image_urls,
        weight=product.weight,
        dimensions=product.dimensions,
        sizes=product.sizes.split(",") if product.sizes else [],
        colors=product.colors.split(",") if product.colors else [],
        storage=product.storage,
        tags=product.tags.split(",") if product.tags else [],
        lining=product.lining
    )
