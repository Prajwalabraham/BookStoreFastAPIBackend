from App.Model.book import Book
import psycopg2
import json
import os
import psycopg2
from dotenv import load_dotenv

# Load the environment variables from the .env file
load_dotenv()

# Retrieve the environment variables
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")
db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")


def search_books(query: str):
    # Create a connection to the PostgreSQL database
    connection = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        password=db_password
    )

    # Create a cursor object
    cursor = connection.cursor()

    # Execute the query to search for books by title, author, or category
    cursor.execute("""
            SELECT DISTINCT b.*
            FROM books b
            LEFT JOIN books_genres bg ON b.book_id = bg.book_id
            LEFT JOIN genres g ON bg.genre_id = g.genre_id
            WHERE lower(b.title) LIKE %s
                OR lower(b.author) LIKE %s
                OR lower(g.name) LIKE %s
        """, ('%' + query.lower() + '%', '%' + query.lower() + '%', '%' + query.lower() + '%'))


    rows = cursor.fetchall()

    # Define a list to store the book data
    books = []

    # Process the retrieved data
    for row in rows:
        book_id, title, author, description, cover_image_url, price, average_rating, created_date, modified_date, stocks = row

        # Create a dictionary for each book
        book = {
            "book_id": book_id,
            "title": title,
            "author": author,
            "description": description,
            "cover_image_url": cover_image_url,
            "price": float(price),
            "average_rating": float(average_rating),
            "created_date": created_date.isoformat(),
            "modified_date": modified_date.isoformat(),
            "stocks": stocks
        }

        # Add the book dictionary to the list
        books.append(book)

    # Close the cursor and the connection
    cursor.close()
    connection.close()

    # Return the JSON object
    return books
