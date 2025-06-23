I use a Dockerized application to address versioning issues, ensure isolation, and speed up dependency retrieval.

There is:

One container for the frontend (React),

One container for the backend (Spring Boot),

Two containers for the MySQL database: one for the server and one for its interface (phpMyAdmin).

I used Dockerfiles for both the backend and frontend to build the images and install the necessary dependencies for Spring Boot and React.js.
I also used a docker-compose.yml file to orchestrate the four applications.

To run the application, use the following command:
Build the full image and run the containers:
docker compose up -d --build
At the end, you'll see a message like this, confirming that four containers are running:
⠿ Container mysql-db        Running               0.0s  
⠿ Container phpmyadmin      Running               0.0s  
⠿ Container springboot-app  Started               5.5s  
⠿ Container react-app       Started               5.5s  
To access the database, go to the phpMyAdmin interface, which is running on port 8081.
Log in using root as both the username and password.
I have already configured a default database named hahn, and a schema.sql file is used to define the database schema.
For the frontend application running on port 3000, you need to wait a little for it to start.
If you have a problem starting the Docker container for your Spring Boot application running on port 8080 this  and encounter an error related to database connectivity, you can simply restart it yourself and it will work.

For the application, I implemented REST endpoints for the product and user tables.
On the frontend side, I used this REST API and added popups for actions like GET, POST, and PUT.

For authentication, I used OAuth with two options:

Google login via Google Cloud

GitHub login

Both options include logout functionality.
You can log in using either your Google or GitHub account.
For security reasons, once you close your browser or refresh the page, you'll need to log in again.

As a best practice, I also implemented services on the Java Spring Boot side.
