//here we will have the javascript code to spin the server

//provides some functionality for spinning up the server
const http = require('http');

const app = require('./app');

//to assign a port at which my project will run
const port = process.env.PORT || 3000
//process.env simply takes the nodejs environment and if not set then we will use 3000 as the default port

const server = http.createServer(app/*here we have a listener that will listen to the coming requests*/);

//to restart the server
server.listen(port);
