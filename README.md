Project Title
This is a sample project for demonstrating how to run tests using Docker Compose.

Getting Started
To get started with this project, follow these steps:

Clone this repository to your local machine.
Build the Docker image using docker-compose build.
Start the Docker container using docker-compose up -d.
Run the tests using npm run test.
Dependencies
Docker
Docker Compose
Node.js
Usage
This project provides a sample API for managing shopping lists. The API can be accessed at http://localhost:3000. Here are some sample requests that can be made to the API:

Auth:
GET /signIn: Retrieve a list of all shopping lists.

Shopping:
PUT /shoppingList/sharedLists/:userId: Create a new shopping list.
GET /shoppingList/:id: Retrieve a specific shopping list.
Tests
This project provides a test suite that can be run using npm run test. The tests cover the following scenarios:

should authenticate a user and return a token"
should fail to authenticate with an incorrect password
should fail to authenticate with an invalid email
write wrong list Id
try to edit someone else list"
try to share list with yourself
share list
share with the same user again
try to access this route without root permissions
get lis
