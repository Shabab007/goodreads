# Book Review App

This project is a partial clone of Goodreads, allowing users to explore, review, and interact with book reviews. Users can browse books, leave reviews and comments, and view activity feeds. Built with a modern tech stack, the application is structured with a backend API, a frontend interface, and a PostgreSQL database.

## Features

- **Browse Books**: Users can explore a list of books and navigate through paginated book collections.
- **Book Details**: View detailed information about each book, including the title, author, description, published date, and cover image.
- **User Reviews**: Users can submit reviews for books, rate them, and read reviews from others.
- **Comment on Reviews**: Each review can have comments, enabling users to engage in discussions about specific reviews.
- **Activity Feed**: Displays recent user activities, such as book reviews and comments, allowing users to keep track of their interactions and those of others.

## Project Image

![Project Screenshot](https://github.com/user-attachments/assets/50f9fdee-43fa-446d-8c2e-28905c562c9b)

## Tech Stack

- **Backend**: Node.js, Express, TypeORM for database interactions
- **Frontend**: React, TypeScript, Tailwind CSS for styling
- **Database**: PostgreSQL
- **Additional Tools**: Docker for containerization, Docker Compose for environment setup, and Git for version control.

## Project Structure

- `src/`: Main source code directory
  - `entity/`: TypeORM entity definitions
  - `controllers/`: Request controllers for handling API logic
  - `services/`: Request services to perform granular logic
  - `repository/`: Handling CRUD operations in databse
  - `routes/`: API endpoint routes
  - `data-source.ts`: Database connection and configuration
- `frontend/`: React frontend application
- `Dockerfile` & `docker-compose.yml`: Configuration files for containerized environments

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- PostgreSQL
- Docker & Docker Compose (optional, for running in containers)

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Shabab007/goodreads.git
cd goodreads
```

### Step 2: Backend Setup

- Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### Step 3: Frontend Setup

- Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

### Docker

It's super simple. If you already have Docker installed and running on your machine you can just run

```sh
docker-compose up
```

It will give you 3 things

1. The Express server in development mode (With hot reloading support)
2. A PostgreSQL database server (If you prefer something else like MySQL just make a couple of change inside the `docker-compose.yaml` file) The credentials are

```sh
DB_HOST = database-layer;
DB_NAME = dbname;
DB_USER = dbuser;
DB_PASSWORD = dbpassword;
```

3. A Database investigation tool named `Adminer` (You can inspect any kind of database from the browser) You can access it from `http://localhost:8080`

If you want to change or update any code you can just make the change and from the console you will see that the server is getting updated.

### Run migration in docker

```sh
  docker-compose exec comm-tool-api npm run migration:create src/database/migration/user
```

### Usage

1. Access the app at http://localhost:3000 (or your configured port).
2. Create a user, browse books, add reviews, comment on reviews, and explore the activity feed
3. access api at http://localhost:4004

### Contributing

Feel free to submit issues or pull requests. This project aims to enhance and improve user interaction features in a simple and scalable way.
