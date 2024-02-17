# Project Todo
Project_todo is a full-stack application built for managing user accounts and Todo's. It provides user registration, authentication, and CRUD operations for to-dos.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)

## Technologies Used
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (mongoose)
  - JSON Web Tokens (JWT)
  - Express Async Handler
  - Other npm packages as per the project needs

- **Frontend:**
  - React.js 

## Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/Shevaitverma/Project_todo.git
    ```

2. Navigate to the project directory:

  - For server
    ```bash
    cd Project_todo
    cd server
    ```
  - For client
    ```bash
    cd Project_todo
    cd client
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file based on `.env.example` and provide the required values.

5. Run the application:

    ```bash
    npm run dev
    ```

## Usage

- The application provides API endpoints for user registration, login, to-do management, and more.
- Ensure that you have MongoDB installed and running.

## Endpoints

- **User Authentication:**
  - `POST /api/users/register` - Register a new user.
  - `POST /api/users/login` - Log in an existing user.
  - `POST /api/users/logout` - Log out the currently authenticated user.
  - `GET /api/users/get-user` - Get information about the currently authenticated user.


- **To-Do Management:**
  - `GET /api/todos` - Get all to-dos for the currently authenticated user.
  - `GET /api/todos/:id` - Get one to-do by ID.
  - `POST /api/todos` - Create a new to-do.
  - `PUT /api/todos/:id` - Update a to-do by ID.
  - `DELETE /api/todos/:id` - Delete a to-do by ID.

- **User Management:**
  - `POST /api/users/refresh-token` - refresh access token of the currently authenticated user.
  - `DELETE /api/users/delete-account` - delete account of currently authenticated user.
  - `POST /api/users/change-password` - Change the password of the currently authenticated user.
  - `PATCH /api/users/update-account` - update account of the currently authenticated user.
