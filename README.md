# movie_api
This is the API/backend for the project myFlix-client. This REST API gives users the ability to create an account, add movies, delete movies, as well as store their favorite movies with genre and director information. 
This repository contains code for the backend; Mongoose and MongoDB were used to create and connect the individual movie objects to a database. Render was then used to host the backend API, and Netlify was used to host the full project with the back and front ends.
# Link to Frontend (myFlix-client)
https://github.com/rbkh17willis/myFlix-client.git
The app can be viewed via this link: main--myflix-willis.netlify.app/
## How Do I Run This On My Local Machine?
Before you begin, ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

Clone the repository:
`git clone https://github.com/rbkh17willis/myFlix-client.git`

Navigate to the project directory:
`cd myFlix-client`

Then, install the dependencies:
`npm install`

Finally, start the app:
`npm start`

To run tests:
`npm test`

Once the app is running, open your web browser and navigate to [http://localhost:1234](http://localhost:1234) to access the app.
# Key Dependencies 
* Cors
* Dotenv
* Express/Express Validator
* JSON Web Token
* Mongoose
* Morgan
* Passport/Passport-JWT/Passport-Local
* Uuid
