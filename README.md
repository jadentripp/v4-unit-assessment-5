Summary
Welcome to Unit Assessment 5! You've reached the final assessment before projects and should be proud of all the work you've done at Devmountain so far. This time, you'll be forking and cloning a partially built project and adding functionality. Remember to use your resources -- slides, notes, labs, the postgres sandboxLinks to an external site. and your favorite, Google.

The app you'll be working on is called Helo. It is a basic social media app where users can make an account and create posts. Currently, parts of the app are missing. Your task during this project will be to add in the needed features. This is somewhat similar to how you'll see code out in the workforce. Not everything will be familiar and it might not be how you would have written it, but you'll still need to be able to work with it. The instructions below will guide you through the project, but no solutions will be provided.

 

You can see a live example of the site hereLinks to an external site..

 

Full-time students: This assessment should take one class day.

Part-time students: This assessment should take one Saturday or two weekday class sessions. If taking place over two days, on the first day, you should aim to complete the Database Setup, Authentication, and Posts sections. On the second day, you should aim to complete the Routing, Redux, and CSS sections.

 

The skills check will cover topics from these lectures:

HTML/CSS: Responsive Design, Animations, and Transitions
Introduction to PostgreSQL
Node: Massive and Heroku
React: Routing
React Redux
Node: Sessions, Cookies, and Authentication
SQL: Working with Relational Databases
 

Interview Questions Quiz
there is also a short quiz that goes with this assessment
you can do this at any time
you can, and it's recommended that you do, take it as many times as you need
 

Setup
Fork the repository (Links to an external site.) for this project
clone it down to your computer
Run npm install
Start coding!
 

Database Setup
You'll be starting in the database. It is currently only partially complete and does not match what we need for the front end. For this portion of the project, you will be running lots of commands in SQL Tabs. You will also need to save many commands in the seed.sql file so that we can see what you did. The rest will be in the other files of your db folder. You'll also be doing some server setup. There are missing dependencies and the index file is incomplete. After this section, you'll go on to Authentication, so don't worry about the user controller just yet.

 

Setup
install massive and dotenv
Create a .env file and create a SERVER_PORT variable, set it to whatever port you would like
Add the .env to the .gitignore
Set up a database in Heroku
you could also grab a connection string from an existing database
just make sure to clear out information or ensure there aren't duplicate tables
Store your connection string in the .env
Open SQL Tabs and enter the connection string from your Heroku database (Alternatively you can use pgweb (Links to an external site.))
Now is also a good time to set up your proxy and main properties in your package.json file.
 

seed.sql file (db folder)
Summary

You need to set up tables in your database so that the rest of your app can function. Currently, there is no seed file, so it's up to you to make one. Make sure to match names exactly since other parts of the database are already written.

 

Instructions

1. Create a seed.sql file in the db folder

2. Create a table called helo_users using the following information

Column Name	Data Type	Constraints
id	serial	primary key
username	varchar	not null
password	varchar	not null
profile_pic	text	
3. Create a table called helo_posts using the following information:

Column Name	Data Type	Constraints
id	serial	primary key
title	varchar(45)	not null
content	text	
img	text	
author_id	integer	ref helo_users id
date_created	timestamp	
 

Important Note

Make sure that you are:

Saving your solutions in seed.sql (so they can be graded)
Running the solutions in SQL Tabs or pgweb (so they change your database)
 

index.js (server)
Summary

Now that you've got those sections of the database done, you'll need to set up massive so that your server can talk to your database.

 

Instructions

Require massive and save to a variable called massive
Require dotenv and configure it
Destructure the connection string and server port from process.env
Set up app.listen using the server port you destructured
Set up massive
Invoke massive and pass in an object with 2 properties:
connectionString whose value should be the connection string you destructured
ssl whose value should be an object with 1 property: rejectUnauthorized whose value should be the boolean false
Massive will return a promise, so you need to handle it with a .then that should:
Use app.set to set the database to the string 'db'
Console log a string to let you know that your database has connected
 

Authentication
Helo needs updated authentication because the old code wasn't very secure. Most of the previous code was cleared out for you. So now you'll need to write the server code to handle authentication and fill in the blanks in some other places. Don't forget that you can test your endpoint handlers using Postman.

 

Setup
Install express-session and bcryptjs.

 

user folder (in db folder)
Summary

Earlier, you set up a new database table to hold Helo users with ids, usernames, passwords, and profile pictures. Now you'll need to write two queries to work with that table.

 

Instructions

create_user.sql
Should insert a new user into the helo_users table
Look at the column names in the schema table above (backend>seed.sql>#7) if you need a reminder of what information you're storing
The last line of your query should be returning *, which will return the user you just created
 

find_user_by_username.sql
Should select everything about a user from the database using a where clause to check the username against one sent in
 

index.js (in server folder)
Summary

Now let's make sure that we have the ability to set up a session. We need to do this before we'll be able to access req.session in the controller.

 

Instructions

In the .env, create a session secret and then back in index.js, destructure it off of process.env
Require express-session and save it to a variable called session
Set up the top-level middleware for the session using app.use.
You'll pass in session invoked to app.use.
You'll need to pass an object to session -- make sure it has
secret
resave
saveUninitialized
and cookie properties
Make sure the cookie object has a maxAge property.
 

user.js (server/controllers/user.js)
Summary

Now we can make the endpoint handler functions that will take care of authentication. You'll export 4 functions from this controller - register, login, getUser, and logout (they must have these names or you need to rename them in index.js if you have a different preference). The instructions below will guide you through, but won't tell you everything. Feel free to go beyond what's here.

 

Instructions

register
Should check to see if the user already exists
If it does, it should send an error message
If it doesn't, then a new user should be created and saved to the req.session object
The username and password should come from the req.body, and for the profile picture you can use `https://robohash.org/${username}.png`
This is a website that provides randomized profile pictures of robots
Remember to use bcrypt (you'll need to require it at the top) to salt and hash your user's passwords
 

login
Should make sure that user exists, if not, send an error
If the user exists, should make sure that the username and password entered match what's in the database (if they don't match, send an error)
If all is well, set the user to the session
 

logout
Destroy the session
Send a 200 status to communicate that everything went well
 

getUser
Check req.session for a logged in user.  If a user is logged in, send their information.  Otherwise, send a 404 status code. 
 

Posts: Backend Functionality
search folder (db folder)
Summary

Someone started the search features in the backend, looks like everything in the posts controller is complete for these features, but the database functions are not. You'll see that the search_all_posts.sql file is done, but you need to make the rest of the search functions work too. Make sure to reference the posts controller as well as search_all_posts and find what information will be sent to the database. Complete the following three files in the database folder using joins.

 

Instructions

search_all_oldest_first.sql
This should get all the same information as searching all the posts, just ordered with the oldest post first
Use aliases for the table names
Use 'as' to create an alias for helo_posts id, call it 'post_id'
User 'as' to create an alias for helo_posts username, call it 'author_username'
Join the posts with the users
Make sure to use WHERE, LIKE, and ORDER BY
 

search_other_oldest_first.sql
This should get all the same information as searching all of the posts, but with the current user's posts filtered out and ordered by the oldest first.
Use aliases on all the same pieces as above
Use an operator to make sure the author_id does not match the one sent from the controller file
Check that you order the dates correctly
 

Search_other_users_posts.sql
This should get all the same information as searching all of the posts, but with the current user's posts filtered out.
Write a query that will get posts from everyone but the current user, with the newest ones first
 

delete_post.sql (db/post)
Looks like this query was left undone. Take a look at the deletePost function in the posts controller to see what information will be provided to your SQL query. Set up your query to delete one post based on its id.

 

posts.js (server/controllers)
Summary

In this case, you are given the SQL query and you need to complete the function in the controller.  Using the create_post.sql , complete the createPost function.  Keep in mind that your information will be coming from several different sources: req.body, req.session.

 

Instructions

Define variables in the createPost function
Create a variable called db whose value is req.app.get('db')
Destructure id from req.session.user
Destructure title, img, and content from req.body
Create a variable called date whose value is new Date
This uses the built in JavaScript Date object to get the current date and time and convert it to a format that our database can read
You only want people creating posts if they're signed in, so you should check to make sure the id has a truthy value
If the id is truthy, then make the database query create_post passing in an array of the id, title, img, content, and date variables
You can then just send a 200 status
Else you should send a 403 (forbidden) status
 

Postman
Open up Postman to test your endpoints if you haven't yet. It will be useful since you can't try them out on the front end until you complete the Routing and Redux sections which are listed below.

 

Routing
Helo has a few prospective views, but no routing in place to navigate them. Once you set this up, you should be able to run npm start and have a mostly working app.

 

Setup
Create a routes.js file in the src directory
install react-router-dom
 

index.js (src)
Import HashRouter from react-router-dom
Wrap it around App (inside React.StrictMode)
 

routes.js (src)
Import Switch and Route from react-router-dom
Import the Auth, Dash, Form, and Post components since they will each be getting their own route
Set up the Switch element as the default export of the file
Inside of the Switch, set up a Route for each of the components using the table below. Make sure to use exact or order your paths so that only one component loads for each respective path.
Path	Component
/	Auth
/dash	Dash
/post/:id	Post
/form	Form
 

App.js (src)
Import the routes file and the Nav component
Render the Nav and the routes below it
 

Nav.js (src/Components/Nav)
Import and destructure Link and withRouter from react-router-dom
withRouter is going to help with our conditional rendering of Nav (go read about it if you're curious!) and we use it similarly to connect, so go down to the export line at the bottom of the file and invoke withRouter passing in the Nav component
Wrap the img tag whose source is homeLogo with a Link to the Dash
Wrap the img tag whose source is newLogo with a Link to the Form
Wrap the img tag whose source is logoutLogo with Link to the Auth component and assign the logout function to the onClick event of the Link
 

Auth.js (src/Components/Auth)
In both the login and register functions, invoke this.props.history.push passing in the path to the Dash component, which will push the user through to the dashboard once they're authenticated
we'll save a user to state in the Redux section
 

Form.js (src/Components/Form)
In the submit function, invoke this.props.history.push passing in the path to the Dash component, which will take users back to the dashboard when they submit their posts
 

Dash.js (src/Components/Dash)
Import the Link component from react-router-dom
Wrap a Link around the h3 element that contains the post title in mappedPosts
the Link should take users to the post using its id in the parameters
 

Post.js (src/Components/Post)
Now that the id is being sent from that Link you just made in the Dash, we can access it on the match.params object that's stored on props. This is very useful for getting information about one individual post which is what this component should do. And right now, the endpoint of the get request in ComponentDidMount is always getting the post with the id of 1 which isn't very useful. That means no matter which post you click on, you'll always be taken to the post with the id of 1.

1. Change the endpoint so that it can get any post based off it's post id

 

npm start

Run nodemon and npm start and you should be able to click around and test out your new routes. You should also be able to register or login according to the server, but the front end won't still won't quite know what's going on, so let's move on to the Redux section.

 

Redux
Redux is the final piece of the functionality puzzle, and then it's on to responsive design to finish up. You'll be setting up Redux to hold user information. Your users can register and login, but your front end immediately forgets who just logged in. Let's fix that. First you will get Redux set up and sending values to the Nav component. Then you'll move onto the Auth component to finish things up.

 

Setup
Create a redux folder inside the src folder
Inside the redux folder, create a store.js file and a reducer.js file
Install redux and react-redux
 

reducer.js (src/redux)
Create an object called initialState. This object should store the username and profile picture for your user.
Export a function named reducer. This function should take in two parameters: state (with the default value of initialState), and action.
Set up a switch statement inside the reducer based on the action's type. For now just set up a default case that returns state.
Write an action builder called updateUser that takes in a parameter for the user object. This will be used to store the user information when someone logs in or registers.
The function should return an action object with two properties: a type and a payload.
The type should be a string that describes what this action is supposed to do. These action type strings are usually stored in a constant outside the function such as const ACTION_TYPE = 'ACTION_TYPE'
The payload should be the object sent in as a parameter, which should have username and profile picture properties.
The function should be exported.
In your reducer function, add a case to the switch statement.
The case should match the action type you just wrote.
This case should return an object with all the same properties you set in initialState.
The values of the object should be based on the values of the action payload.
Write an action builder called logout.
The function should return an action object with a type.
The type should be a descriptive string. Don't forget to save it to its own variable.
The function should be exported.
Add another case to the switch statement in your reducer function.
The case should match the second action type you wrote.
Because this is a logout, the state should be set back to empty values.
 

store.js (src/redux)
Import createStore from redux and the reducer from reducer.js.
Create and export a store using the reducer you just brought in.
 

index.js (src)
Import the Provider from react-redux and the store from store.js.
Wrap HashRouter with the Provider passing the store to the Provider
 

Nav.js (src/Components/Nav)
Import connect from react-redux.
Import updateUser and logout from your reducer.
Write the mapStateToProps function at the bottom of the file.
Now invoke connect inside of withRouter, passing in mapStateToProps and an object for the second argument.
The object should have both updateUser and logout as properties.
Immediately invoke it again passing in the name of the component.
Now if you console.log this.props inside the render and above the return of the Nav component you should see the values coming from the Redux state.
Give the div with the className nav-profile-pic a prop called style which should be equal to an object.
Since an object is JavaScript, you'll need to escape the JSX with an extra pair of curly braces. We can add CSS styles inside this object.
Give the object a property called backgroundImage whose value should be a template string
The template string should contain url('${REDUX_STATE_PIC}') where REDUX_STATE_PIC is the profile picture url from the redux state
Replace the placeholder username with the username from the redux state. The name and picture will be pretty boring looking until we update these values in the next steps.
Update the .then of the logout function to invoke the logout function from the reducer.
Update the .then of the getUser function to invoke the updateUser function from the reducer passing in res.data.
 

Auth.js (src/Components/Auth)
Import connect from react-redux.
Import updateUser from your reducer.
Invoke connect at the bottom.
Pass in null for the first argument. This is because we don't need to use any values from Redux state.
Pass in an object for the second argument. Add updateUser as a value to this object.
Now update the .then for both the register and login methods to invoke the updateUser function passing in an object with the user's username and profile picture information.
 

CSS - Responsive Design
Use what you know to apply some responsive design to the Auth and the Form components. Make some layout changes for phone screens (about 400px or less). You should be able to use the classes and ids that are already in the components, but if you need to add any feel free to do so.

 

Auth.js (src/Components/Auth)
Use a media query to correct the Auth view. It should look something like the second picture, but it doesn't need to be exact.

When you are done, take a screenshot to submit with your GitHub link. 