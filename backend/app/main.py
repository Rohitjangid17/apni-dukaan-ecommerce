from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import os

from app.api import auth, category, product, cart
from app.database import Base, engine

# Initialize FastAPI app
app = FastAPI(
    title="Apni Dukaan API",
    description="This is the backend API for the Apni Dukaan Ecommerce platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auto-create tables
Base.metadata.create_all(bind=engine)

# Mount /uploads to serve product images
uploads_dir = os.path.join(os.getcwd(), "uploads")
if not os.path.exists(uploads_dir):
    os.makedirs(uploads_dir)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(category.router, prefix="/categories", tags=["Category"])
app.include_router(product.router, prefix="/products", tags=["Products"])
app.include_router(cart.router, prefix="/cart", tags=["Cart"])

@app.get("/")
def root():
    return {"success": True, "message": "Apni Dukaan backend is working!"}
