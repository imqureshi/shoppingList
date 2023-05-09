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

3. should authenticate a user and return a token"
4. should fail to authenticate with an incorrect password
5. should fail to authenticate with an invalid email
6. write wrong list Id
7. try to edit someone else list"
8. try to share list with yourself
9. share list
10. share with the same user again
11. try to access this route without root permissions
    10.get list

## design decisions

This section explains the design decision that were made while building the application

## Seeding Data:

I am using faker to generate data with the schema for both users and shopping lists

### Auth:

1. For authentication model I have added the following fields.
   - email: string,
   - password: string,
   - confirmed: boolean,
   - role: string,
2. I am using bcrypt for hashing and its done as a pre mongo hook while saving user
3. I am using a post hook to save customer Ids
4. I am storing JWT and Refresh token in cookies

### Shopping List:

1. All the apis of shopping lists are authenticated by a auth middleware
2. I am using an admin guard for the get api as its accessing the data of all the users
3. For Shopping list model I have added the following fields.
   createdBy: string,
   items: string[],
   sharedWith: [
   {
   user: string,
   permission: enum: ["read", "write", "all"],
   },
   ],
4. For sharing user I have added validations so I can only edit my list to share them
5. schema is build in such a way that we can share list with multiple users
6. A list cant be shared with the user itself and one cant be added multiple times

### gaps identified.

1. Some missing custom interfaces
2. Some apis are missing regarding crud that can be extended
