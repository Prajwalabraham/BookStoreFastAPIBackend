from pydantic import BaseModel
from datetime import datetime


class Book(BaseModel):
    book_id: int
    title: str
    author: str
    description: str
    cover_image_url: str
    price: float
    average_rating: float
    created_date: datetime
    modified_date: datetime
    stocks: int


    class Config:
        orm_mode = True
