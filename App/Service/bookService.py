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


# cursor.close()
# connection.close()
def get_books():
    # Create a connection to the PostgreSQL database
    connection = psycopg2.connect(
        host=db_host,
        port=db_port,
        database=db_name,
        user=db_user,
        password=db_password
    )
    print(db_host, db_port, db_name, db_user, db_password)

    # Create a cursor object
    cursor = connection.cursor()

    # Execute the query to fetch all books
    cursor.execute("SELECT * FROM books")
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


def get_book_by_id(book_id: int):
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

    # Execute the query to fetch the book with the given ID
    cursor.execute("SELECT * FROM books WHERE book_id = %s", (book_id,))
    row = cursor.fetchone()

    if row is not None:
        # Extract the book data from the row
        book_id, title, author, description, cover_image_url, price, average_rating, created_date, modified_date, stocks = row

        # Create a dictionary for the book
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

        # Close the cursor and the connection
        cursor.close()
        connection.close()

        # Return the book dictionary
        return book

    # Close the cursor and the connection
    cursor.close()
    connection.close()

    # If no book is found, return None
    return []


def create_book(book: Book):
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

    # Execute the query to insert a new book
    cursor.execute("""
        INSERT INTO books (title, author, description, cover_image_url, price, average_rating, stocks)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """, (
        book.title,
        book.author,
        book.description,
        book.cover_image_url,
        book.price,
        book.average_rating,
        book.stocks
    ))

    # Fetch the newly created row
    new_row = cursor.fetchone()

    # Commit the changes to the database
    connection.commit()

    # Close the cursor and the connection
    cursor.close()
    connection.close()

    # Map the result to a Book object
    new_book = Book(
        book_id=new_row[0],
        title=new_row[1],
        author=new_row[2],
        description=new_row[3],
        cover_image_url=new_row[4],
        price=new_row[5],
        average_rating=new_row[6],
        created_date=new_row[7],
        modified_date=new_row[8],
        stocks=new_row[9]
    )

    # Return the newly created book
    return new_book


def update_book_by_id(book_id: int, book: Book):
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

    # Execute the query to update the book with the given book_id
    cursor.execute("""
        UPDATE books
        SET title = %s,
            author = %s,
            description = %s,
            cover_image_url = %s,
            price = %s,
            average_rating = %s,
            stocks = %s
        WHERE book_id = %s
    """, (
        book.title,
        book.author,
        book.description,
        book.cover_image_url,
        book.price,
        book.average_rating,
        book.stocks,
        book_id
    ))

    # Commit the changes to the database
    book_i = cursor.fetchone()[0]
    connection.commit()

    # Close the cursor and the connection
    cursor.close()
    connection.close()
    return book_i


def delete_book_by_id(book_id: int):
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

    # Execute the query to delete the book with the given book_id
    cursor.execute("DELETE FROM books WHERE book_id = %s", (book_id,))

    # Commit the changes to the database
    connection.commit()

    # Close the cursor and the connection
    cursor.close()
    connection.close()
