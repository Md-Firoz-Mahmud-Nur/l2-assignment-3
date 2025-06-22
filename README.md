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
