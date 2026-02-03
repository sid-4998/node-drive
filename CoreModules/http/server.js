// Node.js includes a powerful built in HTTP-module for creating 
// HTTP-servers and making HTTP-requests
// This module is essential for building web applications and APIs in Node.js

// Key features
// Create HTTP-servers, handle requests and send responses
// Make HTTP-requests to other servers
// Handle different HTTP methods(GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
// Work with request and response headers
// Handle streaming data for large payload

// Including HTTP module
// In CJS module
// const http = require('http');

// In ES module
// import http from 'http';

// Creating an HTTP server
// The HTTP-module's createServer() method creates an HTTP server that listens to
// requests on a specified PORT and executes a callback function for each request made.

const http = require('http');

// Create a server object
const server = http.createServer((req, res) => { // Creates an HTTP server instance
    // set the response header with status code and content-type
    console.log(req.headers); // Access all requests headers using req.headers object
    res.writeHead(200, { "content-Type": 'text/plain' });
    // send the response body and end the connection
    res.end('Hello world!');
});

const PORT = 3000;
server.listen(PORT, 'localhost', () => { // Starts the server on specified port
    console.log(`Server is running on port ${PORT}!`);
});

// The callback function is executed for each request 
// Containing 2 parameters
// 1. req: The request object(http.IncommingMessage)
// 2. res: The response object(http.ServerResponse)

// Common HTTP status codes
// 1. 200 (Message: OK, Description: Standard response for successful HTTP requests)
// 2. 201 (Message: Created, Description: Request has been fulfiled and new resource created)
// 3. 301 (Message: Moved permanently , Description: Resource has been moved to a new URL)
// 4. 400 (Message: Bad request, Description: Server cannot process the request due to client error)
// 5. 401 (Message: Unauthorized, Description: Authentication is required)
// 6. 403 (Message: Forbidden, Description: Server refuses to authorize the request)
// 7. 404 (Message: Not found, Description: Requested resource could not be found)
// 8. 500 (Message: Internal Server Error, Description: Unexpected condition was encountered)
 
// Common response headers
// Content-Type: Specifies media type of the content(text/plain, text/html, application/json etc)
// Content-Length: The length of the response body in bytes
// Location: Used in redirects(with 3xx status codes)
// Set-Cookie: Sets HTTP cookies on the client
// Cache-Control: Directives for caching mechanisms
// Authorization: For authentication purposes
// Access-Control-Allow-Origin: For CORS support

