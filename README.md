# Book Review API
A RESTful API for managing books and reviews, built with Node.js, Express, and MongoDB. It supports user authentication with JWT, book CRUD operations, review management, and search functionality.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation) & [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Example Requests](#example-requests)

## Features
- User authentication (signup & login) with JWT
- Add new books (authenticated users only)
- Get all books with pagination and filtering by author/genre
- Search books by title (case-insensitive, partial match)
- Submit, update, and delete reviews (one per user per book)

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcryptjs for password hashing

## Setup & Installation
Clone the repository
```bash
git clone https://github.com/<your-username>/book-review-api.git
Step 1: cd book-review-api
Step 2: npm install
Step 3: Create a .env file in the root directory and add environment variables
        PORT=5000
        MONGO_URI=<Your MongoDB connection string>
        JWT_SECRET=<Your secret key>
Step 4: Start the server (node server.js)
```

## API Endpoints
### Auth
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login and get token

### Books
- POST `/api/book/` - Add new book (Authenticated)
- GET `/api/book/` - Get all books (pagination + filters)
- GET `/api/book/search?q=<keyword>` - Search books
- GET `/api/book/:id` - Get book details including reviews

### Reviews
- POST `/api/book/:id/reviews` - Add review for a book (Authenticated)
- PUT `/api/review/:id` - Update your review (Authenticated)
- DELETE `/api/review/:id` - Delete your review (Authenticated)

## Database Schema
### User
- _id
- name
- email
- password

### Book
- _id
- title
- author
- price
- genre
- description
- numReviews
- rating
- createdBy
- 
### Review
- _id
- book (ref Book)
- user (ref User)
- rating
- comment
- unique index on (book, user)


##register user
method: post
url: http://localhost:5000/api/auth/signup
requestbody: 
{
  "name": "Kaushik",
  "email": "kaushik@example.com",
  "password": "123456"
}
output:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTIyMH0.pCvRrOUpBDaXfEIxfM8Ca2-ZDO4zEVHdGoLhApjqj7g",
    "user": {
        "id": "68d3cdb4ea1d0b0df7906622",
        "name": "Kaushik",
        "email": "kaushik@example.com"
    }
}


##login user
method: post
url: http://localhost:5000/api/auth/signin
requestbody:
{
  "email": "kaushik@example.com",
  "password": "123456"
}
output:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTY4Nn0.5B8fslxA1yrGKZbCwkpd_-JK655NIsp3yMLoPWnwXZE",
    "user": {
        "id": "68d3cdb4ea1d0b0df7906622",
        "name": "Kaushik",
        "email": "kaushik@example.com"
    }
}


##add new book
method: post
url: http://localhost:5000/api/book/
headers: 
key: Authorization
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTY4Nn0.5B8fslxA1yrGKZbCwkpd_-JK655NIsp3yMLoPWnwXZE
requestbody: 
{
    "title": "example book 1",
    "author": "example author",
    "description": "sample description for testing",
    "price": 100,
    "genre": "sci-fi"
}
output: 
{
    "title": "example book 1",
    "author": "example author",
    "price": 100,
    "genre": "sci-fi",
    "description": "sample description for testing",
    "numReviews": 0,
    "rating": 0,
    "_id": "68d3d4550b8437d9daacb1a2",
    "__v": 0
}


##fetch all book details
method: get
url: http://localhost:5000/api/book/
requestbody: 
output: 
--WHEN NO BOOKS ARE ADDED
{
    "books": [],
    "page": 1,
    "pages": 0
}
--AFTER ADDING BOOK
{
    "books": [
        {
            "_id": "68d3d2de685cf7653b3f033c",
            "title": "example book 1",
            "author": "example author",
            "price": 100,
            "genre": "sci-fi",
            "description": "sample description for testing",
            "numReviews": 0,
            "rating": 0,
            "__v": 0
        }
    ],
    "page": 1,
    "pages": 1
}


##fetch book details by id
method: get
url: http://localhost:5000/api/book/68d3d2de685cf7653b3f033c
requestbody: NA
output: 
{
    "_id": "68d3d2de685cf7653b3f033c",
    "title": "example book 1",
    "author": "example author",
    "price": 100,
    "genre": "sci-fi",
    "description": "sample description for testing",
    "numReviews": 0,
    "rating": 0,
    "__v": 0
}


##review a book
method: post
url: http://localhost:5000/api/book/68d3d2de685cf7653b3f033c/reviews
headers:
key: Authorization
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTY4Nn0.5B8fslxA1yrGKZbCwkpd_-JK655NIsp3yMLoPWnwXZE
key: Content-Type
value: application/json
requestbody: 
{
    "rating": 3,
    "comment": "lengthy"
}
output: 
{
    "message": "Review added"
}


##update your review
method: put
url: http://localhost:5000/api/review/68d3da2d19d979bea2a7f342
headers:
key: Authorization
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTY4Nn0.5B8fslxA1yrGKZbCwkpd_-JK655NIsp3yMLoPWnwXZE
key: Content-Type
value: application/json
requestbody: 
{
    "rating": 4,
    "comment": "lengthy 123456789"
}
output: 
{
    "message": "Review updated",
    "review": {
        "_id": "68d3da2d19d979bea2a7f342",
        "book": "68d3d2de685cf7653b3f033c",
        "user": "68d3cdb4ea1d0b0df7906622",
        "rating": 4,
        "comment": "lengthy 123456789",
        "__v": 0
    }
}


##delete your own review
method: delete
url: http://localhost:5000/api/review/68d3da2d19d979bea2a7f342
headers:
key: Authorization
value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZDNjZGI0ZWExZDBiMGRmNzkwNjYyMiIsImlhdCI6MTc1ODcxMTY4Nn0.5B8fslxA1yrGKZbCwkpd_-JK655NIsp3yMLoPWnwXZE
key: Content-Type
value: application/json
requestbody: NA
output: 
{
    "message": "Review deleted"
}


##search book by title
method: get
--WHEN WRONG PARAMETER IS PASSED
url: http://localhost:5000/api/book/search?q=sampl
requestbody: NA
output: 
[]
--WHEN RIGHT PARAMETER IS PASSED (partial)
url: http://localhost:5000/api/book/search?q=exa
requestbody: NA
output: 
[
    {
        "_id": "68d3d2de685cf7653b3f033c",
        "title": "example book 1",
        "author": "example author",
        "price": 100,
        "genre": "sci-fi",
        "description": "sample description for testing",
        "numReviews": 0,
        "rating": 0,
        "__v": 0
    }
]
