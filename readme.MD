# Task Management API

## Overview

This is a Node.js-based(Express) Task Management API that allows users to manage tasks. The API includes endpoints for creating, fetching, editing, updating, and deleting tasks. Swagger documentation is provided to make it easier to understand and test the API.

## Prerequisites

- [Node.js](version 17 or higher)
- [npm](Node Package Manager)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   ```

2. **Install Dependencies:**

   Install the required Node.js packages:

   ```bash
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory of your project and add any required environment variables.

   Example:

   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/taskdb
   ```

## Running the Application

1. **Start the Server:**

   Run the following command to start the server:

   ```bash
   npm start
   ```

   By default, the server will start on `http://localhost:3000`.

2. **Running in Development Mode:**

   If you want to run the application in development mode with live-reloading, you can use:

   ```bash
   npm run dev
   ```

## Swagger API Documentation

I used Swagger to document the API endpoints.


### Viewing the Swagger Documentation

Once the server is running, you can view the Swagger documentation in your browser:

1. **Access the Documentation:**

   Navigate to:

   ```
   http://localhost:3000/docs
   ```

   This will display the Swagger UI where you can view and test the API endpoints.

## Testing the API

You can test the API endpoints directly through the Swagger UI or by using tools like Postman.

