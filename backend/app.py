from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

books = [
    {
        "id": 1,
        "title": "1984",
        "author": "George Orwell",
        "description": "Dystopie politique",
        "coverUrl": "https://placehold.co/150x200",
    },
    {
        "id": 2,
        "title": "Dune",
        "author": "Frank Herbert",
        "description": "Science-fiction épique",
        "coverUrl": "https://placehold.co/150x200",
    },
    {
        "id": 3,
        "title": "Le Petit Prince",
        "author": "Antoine de Saint-Exupéry",
        "description": "Conte philosophique",
        "coverUrl": "https://placehold.co/150x200",
    },
]


@app.route("/books", methods=["GET"])
def get_books():
    return jsonify(books)


@app.route("/books/<int:book_id>", methods=["GET"])
def get_book(book_id):
    book = next((book for book in books if book["id"] == book_id), None)
    if book is None:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book)


@app.route("/books", methods=["POST"])
def add_book():
    data = request.json

    new_id = max(book["id"] for book in books) + 1 if books else 1
    new_book = {
        "id": new_id,
        "title": data["title"],
        "author": data["author"],
        "description": data.get("description", ""),
        "coverUrl": data.get("coverUrl", "https://placehold.co/150x200"),
    }
    books.append(new_book)
    return jsonify(new_book), 201


@app.route("/books/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    global books
    books = [book for book in books if book["id"] != book_id]
    return jsonify({"message": "Book deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)
