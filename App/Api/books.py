from fastapi import APIRouter
from typing import List
from App.Model.book import Book
from App.Service.bookService import get_books, get_book_by_id, create_book, delete_book_by_id, update_book_by_id
import requests
import schedule
import time

router = APIRouter()

@router.get("/")
def helloWorld():
    return "Hello World"


@router.get("/books", response_model=List[Book])
def get_all_books():
    return get_books()


@router.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    return get_book_by_id(book_id)


@router.post("/books", response_model=Book, status_code=201)
def add_book(book: Book):
    return create_book(book)


@router.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, book: Book):
    return update_book_by_id(book_id, book)


@router.delete("/books/{book_id}")
def delete_book(book_id: int):
    delete_book_by_id(book_id)
    return {"message": "Book deleted successfully"}


