from sqlalchemy import Column, Integer, Float, String
from app.database import Base

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    product_id = Column(Integer, nullable=False)
    quantity = Column(Integer, default=1)
    price = Column(Float, nullable=False)
    color = Column(String(50), nullable=True)
    size = Column(String(50), nullable=True)
