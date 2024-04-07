**Backend API Documentation**
This backend application provides a set of APIs to manage users in a MongoDB database. It allows you to perform operations such as creating users, fetching random users, getting all users, retrieving user names, checking user existence, and fetching users above a certain age.

**Table of Contents**
Setup
API Endpoints
Create User
Get Random User
Get All Users
Get User Names
Check User Existence
Get Users Above Age
Usage
Environment Variables
Deployment


**Setup**
Clone the repository:
git clone https://github.com/Preet-Chandak/Backend-API.git

Install dependencies:
npm install

Set up environment variables:
Create a **.env** file in the root directory of the project and add the following:

DB_URI=<your-mongodb-uri>
Replace <your-mongodb-uri> with the connection URI for your MongoDB database ATLAS.

Start the server:
node server.js
The server should now be running on port 3000 by default.

**API Endpoints:**

Create User
Endpoint: POST /api/users/create
Description: Creates a new user in the database.

Request Body:
name: Name of the user (String)
dob: Date of birth of the user (Date)
location: Location of the user (String)

Get Random User:
Endpoint: GET /api/users/random
Description: Retrieves a random user from the database.

Get All Users:
Endpoint: GET /api/users/all
Description: Retrieves all users from the database.

Get User Names:
Endpoint: GET /api/users/names
Description: Retrieves the names of all users from the database.

Check User Existence:
Endpoint: POST /api/users/exists
Description: Checks if a user exists by name.

Request Body:
name: Name of the user to check (String)
Get Users Above Age
Endpoint: POST /api/users/above-age
Description: Retrieves users above a certain age.

Request Body:
age: Age threshold (Number)
Usage
To use the APIs, you can send HTTP requests to the specified endpoints using tools like Postman or curl.

Environment Variables:
DB_URI: Connection URI for the MongoDB database.


**Deployment**
This backend application can be deployed to platforms on Versal. Make sure to set up the environment variables accordingly.