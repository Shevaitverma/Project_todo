# Project Todo 
**Project_todo** is a full-stack application designed for managing user accounts and to-dos. It offers user registration, authentication, and CRUD operations for managing tasks, enabling users to efficiently keep track of their daily activities. The application is built using a modern tech stack with separate frontend and backend components.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Running with Docker](#running-with-docker)
- [Contributing](#contributing)

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB (using Mongoose)
- JSON Web Tokens (JWT) for authentication
- Express Async Handler for managing async middleware
- Other npm packages as per the project needs (e.g., bcrypt for password hashing, dotenv for environment variables)

### Frontend

- React.js with Vite for fast development
- Tailwind CSS for styling
- Redux for state management


## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Shevaitverma/Project_todo.git
    ```

2. Navigate to the project directory:

    - For server:
      ```bash
      cd Project_todo/server
      ```
    - For client:
      ```bash
      cd Project_todo/client
      ```

3. Install dependencies for both frontend and backend:

    ```bash
    npm install
    ```

4. Set up environment variables:

    - Create a `.env` file based on `.env.example` in both the server and client directories and provide the required values.

5. Run the application:

    ```bash
    # For backend
    npm run dev

    # For frontend (in a separate terminal)
    npm run dev
    ```

## Usage

- The application provides API endpoints for user registration, login, and to-do management. Users can register, log in, create, update, and delete their to-dos.
- Ensure that you have MongoDB installed and running, or use a cloud-based MongoDB service.

## Endpoints

### User Authentication

- **POST** `/api/users/register` - Register a new user.
- **POST** `/api/users/login` - Log in an existing user.
- **POST** `/api/users/logout` - Log out the currently authenticated user.
- **GET** `/api/users/get-user` - Get information about the currently authenticated user.

### To-Do Management

- **GET** `/api/todos` - Get all to-dos for the currently authenticated user.
- **GET** `/api/todos/:id` - Get one to-do by ID.
- **POST** `/api/todos` - Create a new to-do.
- **PUT** `/api/todos/:id` - Update a to-do by ID.
- **DELETE** `/api/todos/:id` - Delete a to-do by ID.

### User Management

- **POST** `/api/users/refresh-token` - Refresh access token for the currently authenticated user.
- **DELETE** `/api/users/delete-account` - Delete the account of the currently authenticated user.
- **POST** `/api/users/change-password` - Change the password for the currently authenticated user.
- **PATCH** `/api/users/update-account` - Update account details for the currently authenticated user.

## Running with Docker

1. Ensure you have Docker and Docker Compose installed.
2. You need to add mongo cluster's url to comfigure mongodb.
3. Navigate to the project directory and run:

    ```bash
    docker-compose up --build
    ```

4. Access the frontend at `http://localhost:3000` and the backend API at `http://localhost:4001`.
Note: you need to give your environment variables to the docker-compose file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.


