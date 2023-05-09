# Shopping List
This is a project implement a shopping list app

## Getting Started
To get started with this project, follow these steps:

## Clone this repository to your local machine.
1. Build the Docker image using docker-compose build.
2. Start the Docker container using docker-compose up -d.
3. Run the tests using npm run test.
## Dependencies
1. Docker
2. Docker Compose
3. Node.js
## Usage
This project provides a sample API for managing shopping lists. The API can be accessed at http://localhost:3000. Here are some sample requests that can be made to the API:

Auth:
1. GET /signIn: Retrieve a list of all shopping lists.

Shopping:
1. PUT /shoppingList/sharedLists/:userId: share a list with user.
2. GET /shoppingList/:userId: Retrieve a specific shopping list.
Tests
This project provides a test suite that can be run using npm run test. The tests cover the following scenarios:

1. should authenticate a user and return a token"
2. should fail to authenticate with an incorrect password
3. should fail to authenticate with an invalid email
4. write wrong list Id
5. try to edit someone else list"
6. try to share list with yourself
7. share list
8. share with the same user again
9. try to access this route without root permissions
10.get list
