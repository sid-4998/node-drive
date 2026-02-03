// Handling HTTP methods
// RESTful APIs commonly use different HTTP methods(GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS)
// in order to perform different operations on resources

const http = require('http');
const { URL } = require('url');


let todos = [
    { id: 1, task: 'Learn Node.js', completed: false},
    { id: 2, task: 'Build an API', completed: false}
];

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const URLObject = new URL(url, `http://${req.headers.host}`);
    const pathname = URLObject.pathname;

    // Handle preflight request

    // What is a preflight request?
    // A preflight request is a Cross-Origin Resource Sharing (CORS) 
    // security mechanism used by web browsers to check if a cross-origin 
    // server understands the CORS protocol and allows the "actual" request 

    // It is an automatic OPTIONS request sent before the main, non-simple request 
    // to verify permissions, preventing unauthorized cross-site requests. 

    // What triggers a preflight request?
    // Browsers send a preflight (OPTIONS) request when the request is not "simple."
    // If the request uses methods such as PUT or DELETE it is not a simple request
    // Includes custom headers (e.g., Authorization, X-Requested-With).
    // Uses a Content-Type other than application/x-www-form-urlencoded, multipart/form-data, 
    // or text/plain (e.g., application/json). 

    // Steps to handle a preflight request
    // Because preflight requests are OPTIONS requests, you must handle 
    // them explicitly by responding with specific CORS headers.

    // 1. Check the Method: Identify OPTIONS
    // 2. Set CORS Headers: Define allowed origins, methods, and headers
    // 3. Return Status: Respond with 204 No Content or 200 OK without a body. 
    if(method === 'OPTIONS') {
        // This is CORS header that allows all origins, domains, schemes and ports
        // to access the resources shared by this web server.
        res.setHeader('Access-Control-Allow-Origin', '*'); 
        // This is CORS header that allows specified HTTP methods
        // to access the resources shared by this web server.
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // This is CORS header that allows specified media type 
        // to access the resources shared by this web server.
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.writeHead(204); // No content
        res.end();
        return;      
    }

    // Route: GET /todos
    if(method === 'GET' && pathname === '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    }

    // Route: POST /todos
    else if(method === 'POST' && pathname === '/todos') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            try{
                const newTodo = JSON.parse(body);
                newTodo.id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
                todos.push(newTodo);
                res.writeHead(201, { 'Content-Type': 'application/json'});
                res.end(JSON.stringify(newTodo));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json'});
                req.end(JSON.stringify({ error: 'Invalid JSON' }));
            } 
        });
    }
    
    // Route: PUT /todos/:id
    else if(method === 'PUT' && pathname.slice(0,pathname.length - 1) === '/todos/') {
        const id = parseInt(pathname.split('/')[2]);
        
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const updatedTodo = JSON.parse(body);
                const index = todos.findIndex(t => t.id === id);

                if(index === -1) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Todo not found' }));
                } else {
                    todos[index] = {...todos[index], ...updatedTodo};
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(todos[index]));
                }
            } catch(error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    // Route: DELETE /todos/:id
    else if(method === 'DELETE' && pathname.slice(0,pathname.length - 1) === '/todos/') {
        const id = parseInt(pathname.split('/')[2]);
        const index = todos.findIndex(t => t.id === id);
        try {
            if(index === -1) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Todo not found' }));
            } else {
                todos = todos.filter(t => t.id !== id);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end();
            }
        } catch(error) {
            res.writeHead(404, { 'Content-Type': 'application.json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server is running!');
})

// Best practices for HTTP methods

// 1. GET: Retrieve a resource or collection of resources (Should be idempotent)
// 2. POST: Create a new resource (not idempotent)
// 3. PUT: Update an existing resource or create it if it doesn't exist (idempotent)
// 4. PATCH: Partially update a resource
// 5. DELETE: Remove a resource (Idempotent)
// 6. HEAD: Same as GET but without the response body
// 7. OPTIONS: 