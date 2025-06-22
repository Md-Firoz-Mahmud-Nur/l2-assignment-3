# BookHive - Library Management API

A **Library Management System** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
This project allows you to manage books, borrow them with availability checks, and view borrowed book summaries — with clean API design and consistent error handling.

## Live Site URL
Visit [BookHive](https://assignment-3-flax-seven.vercel.app/)

## Project Overview

**BookHive** allows seamless management of books and borrow operations with:
- **Book Management:** Full CRUD capabilities for books with fields like title, author, genre, description, and copy tracking.
- **Borrow Operations:** Create borrowing records, auto-update available copies, and set return due dates.
- **Inventory Monitoring:** Ensures real-time updates to book stock and borrowing logs.
- **Schema Validation:** Strong data integrity using Mongoose with custom validation and enums.
- **Filtering & Sorting:** Filter books by genre and sort by multiple fields.
- **Error Handling:** Unified and structured error responses for better developer experience.

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Mongoose)
- **Dev Tools:** ts-node-dev, ESLint, Prettier, dotenv
- **Validation:** Mongoose schemas with enums, methods, and middleware
- 
## Locally Run This Application 

1. **Clone the Repositories:**
    ```sh
    # Server Side:
    git clone https://github.com/Md-Firoz-Mahmud-Nur/l2-assignment-3.git
    cd l2-assignment-3
    ```

2. **Install Dependencies:**
    ```sh
    npm install
    ```
    
3. **Add `.env` file in the root of project:**
    ```sh
    MONGO_DB_USER=
    MONGO_DB_SECRET_KEY=
    MONGO_DB_URI_SECRET_KEY=
    ```

4. **Start the Development Server:**
    ```sh
    npm run dev
    ```


# **API Details**
### 01. Create Book
POST `/api/books`
#### Request:
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
#### Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
### 02. Borrow a Book
POST `/api/borrow`
#### Request:
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
#### Response:
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```
### 03. Borrowed Book Summary
GET `/api/borrow`
#### Response:
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```
### 04. Get All Books
GET `/api/books`

#### Example Query:

`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### Response:
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```
