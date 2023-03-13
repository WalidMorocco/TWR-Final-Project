# CoffeeMe

## Deployment Instructions
(In order to access the deployed application go to https://coffee-me.herokuapp.com/)
Deployment steps for the CoffeeMe server and client will be detailed below. Once both
are deployed, the CoffeeMe application can be opened using a browser and navigating
to “https://[client application name].herokuapp.com/”.
You are welcome to access an already deployed production application here:
https://coffee-me.herokuapp.com/
Server
The CoffeeMe server runs on its own dedicated Heroku application. The Heroku server
application is used in conjunction with a dedicated server GitHub repository.
Repository Setup
1. Go to https://github.com/ and create a GitHub account.
2. Create a repository for the server and name it (e.g. “coffee-me-server”)
3. Copy contents of the server folder from the development repository (server
folder)
4. It is also possible to use the existing production server repository (prod server
repository)
Application Setup
1. Log in to your Heroku account (if previously created).
2. Navigate to your server application page (see server app setup)
3. Navigate to the Deploy tab
4. In the Deployment method section, pick the GitHub option.
5. Authorize Heroku to connect to the your GitHub account
6. Select the server repository previously created
7. Heroku will build and automatically deploy the server application.
Client
The CoffeeMe client runs on its own dedicated Heroku application. The Heroku client
application is used in conjunction with a dedicated client GitHub repository.
Repository Setup
1. Log in to your GitHub account.
2. Create a repository for the client and name it (e.g. “coffee-me”)
3. Copy contents of the client folder from the development repository (client folder)
4. It is also possible to use the existing production client repository (prod client
repository)
Application Setup
1. Log in to your Heroku account.
2. Navigate to your client application page (see client app setup)
3. Navigate to the Deploy tab
4. In the Deployment method section, pick the GitHub option
5. Authorize Heroku to connect to the your GitHub account
6. Select the client repository previously created
7. Heroku will build and automatically deploy the client application
