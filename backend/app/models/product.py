from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1000))
    price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    created_by = Column(Integer, nullable=False)
    images = Column(String(1000))

    weight = Column(Float, nullable=True)
    dimensions = Column(String(100), nullable=True)
    sizes = Column(String(100), nullable=True)
    colors = Column(String(100), nullable=True)
    storage = Column(String(255), nullable=True)
    tags = Column(String(255), nullable=True)
    lining = Column(String(255), nullable=True)

    category = relationship("Category", backref="products")
    cart_items = relationship("Cart", back_populates="product")
