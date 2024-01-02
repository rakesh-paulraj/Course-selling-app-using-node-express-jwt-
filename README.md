# Course-selling-app-using-node-express-jwt-
a very simple course selling app background logic created with authentication of user and many sub-parts which has 3 different sets of databases Admin, User and Courses 
First the project has divided into 3 parts 1)Mongoose 2)middleware 3)Routes
In mongoose the schema for the input of data is created (user,courses,admin)
then in middlewares(it is used to Authorize it has two files one for admin and one for the user 
Both the middlewares use jwt(jsonwebtoken) to verify the user or admin which the token will be provided in the headers
and  then comes the routes it is the most important part where this is the one which communicates in the front end 
Here the admin file will determine the request given by the admin and same for the user 
