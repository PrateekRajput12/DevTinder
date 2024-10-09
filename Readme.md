
#1 
- Create Repo
- Initialize the repo
- Find difference b/w node_modules,package.json,package- lock.json
- install Express
- create a server
- listen to port 8000
- make requests handler for /start and /hello
- install nodemon and make scipt inside package.json
- difference b/w caret and tilda ~and ^
- what are dependencies
- what is the use or - g while npm intall




- Create a free Cluster on MongoDB Official Website
- Install Mongoose Library
- Connect your application to database 'Connect- URL/Devtinder'
- Call the connectDB function and connect to database before starting application on 7070
- Create a User Schema & user Model in your SYstem
- create /signup API to add data to Database
- Push Some documents using API calls from postman
- Error handling using try catch block



- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API Dynamic to recieve data from the end user
- user.findOne() with duplicate email id 
- API get user by email 
- API -  feed API - GET/feed - get all the users from the database
- API - get user by id
- create a DELETE user API
- Differece btw PATCH and PUT
- API-  Update a user
- Explore Mongoose documentation for model methods
- what are optiona in a Model.findOneAndUpdate() method explore more about it
- API update the user with emailID


- Explore Schemetype options from the documentation
-  add required , unique,lowecase,min,minLength,trim
-  Add default
-  create custom Validate  function for gender
-  Imporve the DB schema -  PUT all appropriate validations on each field in schema
-  Add timestamps to the userSchema
-  Add API level validation on patch request & signup post api 
-  Data Senitization Add API validation for each field
- Install validator
- Explore validator Library functions for password email or url
- Never TRUST  req.body





 - Validate Data in SIgnup API
 - install bcrypt package
 - create passwordHash using bcrypt.hash & save the user is excrupted password
 - Create login API write logic by your own
 - compare password and throw errror if email or password is invalid


- install cookie-parser
-  just send a dummy cookie to user
- create Get /profile API and check if you get the cookie back
- install jsonwebtoken
- Intsall jsonwebtoken
 - In login APi, after email and password validation, create a JWT token and send it to user inn cookie
 - read the cookie inside your profile API and find the logged in user
 - userAuth middleware 
 - Add the userAuth middleare in profile api and send new connectionrequest API
 - set expiry of JWT token and cookies to 7 days
- create User Schema method to getJWT()
- create User Schema method to compare password and take password input




- Explore tinder APIs 
- create a list of all apis think of in Dev Tindr
- Group multiple routes under respective routers
- Read documentaion for express.Router
- create routes folder for managing auth,profile,request router
- create authRouter , profileRouter , requestRouter
- Import these routers in app.js
- Create Post/logout API
- PAtch/profile/edit API
- creata Patch/profile/password API=?>forgot Password Api
 - Make you validateall data i every POST PATCH apis