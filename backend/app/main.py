from fastapi import FastAPI
from app.api import auth
from app.database import Base, engine

app = FastAPI()

app = FastAPI(
    title="Apni Dukaan API",
    description="This is the backend API for the Apni Dukaan Ecommerce platform.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Auto-create tables
Base.metadata.create_all(bind=engine)

# Routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
# app.include_router(products.router, prefix="/products", tags=["Products"])
# app.include_router(cart.router, prefix="/cart", tags=["Cart"])

@app.get("/")
def root():
    return {"success": True, "message": "Apni Dukaan backend is working!"}
