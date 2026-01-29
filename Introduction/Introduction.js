/** Node.js is a free, open-source Javascript runtime. 
 *  It runs on Windows, Mac, linux and more. 
 *  It lets us execute Javascript code outside of a web browser.
 *  It enables server-side development with Javascript.
 *  It is built on chrome's V8 Javascript Engine.
 *  It is designed to build scalable network applications*/ 


// Node.js Applications

// 1. Web servers: Node.js helps us build scalable network applications
// 2. File operations: Node.js helps us read, write and manage files on the server
// 3. Database Interaction: It can work with databases such as MongoDB, PostgreSQL and more
// 4. APIs and microservices: It can build RESTFUL services and GraphQL APIs
// 5. Real-time: Handles web sockets for live applications
// 6. CLI Tools: It can build command line applications

// Node.js applications basically are servers which run on your computer.

// Node.js vs Browser
// Node.js and browsers both run javascript but they have different environments and capablities
// Node.js is designed for server side development while browsers are for client side applications

// Node.js provides APIs for file system, networking and OS which browsers do not.
// Browsers provide DOM, fetch and UI APIs not present in Node.js

// Node.js uses global object
// Browsers use window or self

// Node.js uses commonJS and ES modules
// Browsers use ES modules and scipts

// Node.js has full OS access including file system and networking
// Browsers run in a sandbox with limited access

// What is sandboxing?

// Browser sandboxing is a security mechanism that runs web browser 
// processes in an isolated, restricted environment—a 
// "sandbox"—preventing malicious code from accessing the host 
// operating system, files, or sensitive data

// Both Node.js and browser environments use an event loop but
// Node.js has additional APIs for process, timers etc

// Node.js can access environment variables unlike browsers
// Node.js package management is dealt with npm/yarn
// Browsers use bundlers or CDNs for package management.

// What are CDNs and Bundlers?

// CDNs (Content Delivery Networks) and Bundlers are both 
// technologies used in web development to improve website performance, 
// but they operate at different stages—CDNs handle delivery, 
// while bundlers handle development and optimization. 

// A CDN is a geographically distributed network of servers that caches 
// content (such as images, videos, CSS, and JavaScript files) closer to end-users. 

// The primary function of a content delivery network is to reduce latency
// by serving content from a "edge server" rather than from the origin server

// What is an edge server?
// The server which is geographically closest to the client

// What is latency?
// The time taken by data to travel from a server to a client

// Benefits of using content delivery networks.
// 1. Faster loading times: Reduces the distance data travels
// 2. Reduced bandwidth cost: Offloads traffic from origin server
// 3. Increased reliability: Handles traffic spikes by distributing the load
// across servers and provides redundancy(If one server fails another takes over)
// 4. Enhanced security: Protects against DDoS attacks and provides SSL/TLS certificates

// Example: Cloudfare, Amazon cloudfront, Akamai, Fastly.

// What are Bundlers?

// A javascript bundler is a developer tool that takes various pieces of code,
// assets and dependencies(npm packages) and packs them into small number of 
// optimized, browser compatible files

// The primary function of a bundler is manage, organize and optimize assets,
// specifically reducing the number of HTTP requests a browser needs to make

// Example: Vite, Webpack, Parcel, Rollup.

// What is caching?
// Caching is the process of storing copies of data in a temporary, high-speed storage 
// location (a cache) to serve future requests faster, reducing latency and database load. 
// By keeping frequently accessed data closer to the application or user, it improves system 
// performance and efficiency, commonly used in web browsers, CPU memory, databses and 
// content delivery networks. 

// Types of caching
// 1. Browser caching: Browser stores local copies of website file(HTML,CSS,JS) to 
// load pages faster
// 2. CDN caching: Using edge servers for clients
// 3. Database caching: In memory stores like Redis keep data in RAM to avoid 
// expensive database queries
// 4. CPU caching: Fast memory built into the processor

// Skipped Topics: Node command line, Role of V8 engine in node

// Node Architecture(Important)

// Node.js uses single-threded, event driven achitecture and is designed to handle
// many connections at once without blocking the main thread

// Key Characteristics
// 1. Non-blocking I/O
// 2. Event-driven
// 3. Single-threaded with event loop
// 4. Asynchronous execution

// What is meant by single threading?

// Refers to the main JavaScript execution thread 
// (the event loop) that runs your application code one task at a time
// This design simplifies programming by avoiding common multithreading 
// issues like deadlocks and race conditions, as only one piece of 
// JavaScript code runs at any given moment. 

// Architecture

// 1. Client request phase
// Client sends requests to the Node.js server
// Each request is added to the Event Queue

// 2. Event Loop Phase
// The event loop continously checks the event queue
// Picks up requests one by one in a loop

// 3. Request processing
// Simple(non-blocking) tasks are immediately handled by the main thread
// Complex(blocking) tasks are offloaded to the system kernel which uses an internal thread pool to handle such tasks

// 4. Response phase
// When blocking tasks complete, their callbacks are placed in the callback queue
// The event loop processes callbacks and sends responses

// Due to this non-blocking, event-driven, single threaded architecture of node, 
// it handles multiple concurrect network requests without being blocked by 
// complex time taking operations by using its event loop by offloading such 
// tasks to the system.

// Event loop 
// This event loop is what makes node non-blocking and efficient

// It handles asynchronous operations by delegating such tasks to the system kernel 
// or a seperate internal thread pool and processing their result through callbacks
// which allows node to manage thousands of concurrent connections with a single thread

// Event loop phases
// 1. Execute the main script(synchronous code)
// 2. Microtasks(Promises/process.nextTick)
// 3. Timers(setTimeout, SetInterval)
// 4. Run I/O callbacks: Completed I/O operations(file system, network operations)
// 5. Poll: Retrieve new I/O events
// 6. Check: Process setImmediate callbacks
// 7. Close: Handle close events

// Between each phase Node.js runs microtasks(Promises) and Process.nextTick callbacks

console.log("1. start");

// Next Tick queue
process.nextTick(() => console.log("2. Next Tick"));

// Microtask queue
Promise.resolve().then(() => console.log("3. Promise"));

// Timer phase
setTimeout(() => console.log("4. Timer"), 0);

// Check phase
setImmediate(() => console.log("5. Check"));

console.log("6. end");

// Priority order of different callbacks
// synchronous code -> nextTick -> Promise -> Timer -> Check


