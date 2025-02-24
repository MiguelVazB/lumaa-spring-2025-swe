# Task Management Project

## Prerequisites

- Node.js (https://nodejs.org/)
- PostgreSQL (https://www.postgresql.org/download/)

## Setup Instructions

### Database: PostgreSQL

The tables will be created automatically when the server is run.

### Backend (Server)

1. **Clone the repository:**
   git clone https://github.com/MiguelVazB/lumaa-spring-2025-swe.git
   cd TaskManagement/server

2. **Install dependencies:**
   npm install

3. **Create a .env file in the server directory**
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=postgres
   JWT_SECRET_KEY = b76e98d8b73c7b7a5f24c60c2b9e8316980ea02feb25b280ae65dbda7abef698934a6147d47126dc43f09b1562bbac6a2d55eccc163de8bb776c72072db67974

4. **Start the PostgreSQL server and create the database:**
   psql -U postgres -c "CREATE DATABASE postgres;"
   You can also start it using pgAdmin4 if you encounter any issues

5. **Run the server:**
   npm run dev

If the setup was successful, You should see the following messages on the terminal:
App listening on port 3000!
Connected to the PostgreSQL database
Tasks table created successfully
User table created successfully

### Frontend (Client)

1. **Navigate to the client directory:**
   cd ../client

2. **Install dependencies:**
   npm install

3. **Create a .env file in the client directory**
   VITE_API_URL="http://localhost:3000"

4. **Run the client:**
   npm run dev

## Access the Application

The backend server runs on http://localhost:3000/
The frontend client runs on http://localhost:5173/

Salary Expectations per month:
Assuming 20 hrs per week as posted in the job board.
I expect $25/hr which would convert to $2000/month
