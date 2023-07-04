from fastapi import APIRouter
from typing import List
from App.Model.book import Book
from App.Service.searchService import search_books

router = APIRouter()


@router.get("/search", response_model=List[Book])
def search(query: str):
    return search_books(query)
