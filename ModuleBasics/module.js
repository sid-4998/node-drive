// Modules are building blocks of Node.js applications.
// They help in organizing, maintaining and creating reusable code.
// They provide encapsulating functionality
// They prevent global namespace pollution
// There are 2 types of node modules
// 1. commonJS
// 2. ECMAscript

// Node.js uses CommonJS modules by default
// Use require() to import and module.exports to export
// Modules are cached after first load

// Best practices
// Keep modules focused on a single responsibility
// Use meaningful file and directory names
// Group related functionality together
// Use index.js for module entry points
// Prefer named exports for utilities
// Use default exports for single-class modules

// ES modules
// Better than commonJS for most use cases
// Provides the benefit of tree-shaking for smaller builds

// CommonJS vs ES
// Based on file extension
// commonJS uses .js extension whereas ES uses .mjs or .js(with type set as 'module' in package.json)
// Basic difference in import and export syntax
// commonJS uses `require()` to import and module.exports for exporting
// ES uses `import` and `export`(named export) or `export default`(default export)
// Based on import timing
// commonJS uses dynamic imports(during runtime)
// ES uses static imports(parsed before execution)
// Top-level await is not supported in commonJS and it is supported in ES
// File URL is not required in commonJS imports whereas it is required for local files in ES

// Note: If we are working on a codebase written in commonJS and we want to use 
// ES modules, we can use the .mjs extension for error free code 

// Dynamic imports
// Note that dynamic import returns a promise
// Dynamic imports are used for code-splitting, lazy-loading modules or
// conditionally loading modules based on runtime conditions
// ES modules support dynamic imports

const dotenv = require('dotenv');
dotenv.config();

async function calculate() {
    const {add, subtract} = await import('./math.mjs');
    console.log(add(10,5));
    console.log(subtract(10,5));
}
calculate();


async function loadModule(moduleName) {
    try{
        // Importing ESM in commonJS module
        const {default: myModule} = await import(`./${moduleName}.mjs`);
        return myModule;
    } catch(error) {
        console.error(`Failed to load ${moduleName} module!`);
    }
}

const moduleName = (process.env.NODE_ENV) === 'production' ? 'production' : 'development';

loadModule(moduleName)
.then(
    (resultModule) => {
        resultModule();
    }
).catch(
    (error) => {
        console.error(error);
    }
)

// ES Modules can import commonJS Modules as default imports
// CommonJS Modules can require() ES Modules only with dynamic imports
// process.env is a built in global object in Node.js
// In order to use environment variables in a module,
// we can make a .env file in the root of the directory
// Then install dotenv package using npm install dotenv
// Then call the config() function of the dotenv instance
// Access the environment variables using process.env.YOUR_VARIABLE;

// Importing/requiring named exports
// In ES module
// import {add, subtract} from './math.mjs';
// Giving aliases to imports
// import {add as sum, subtract as minus} from './math.mjs'
// Importing all named exports as an object
// import * as math from './math.mjs'

// In commonJS module
// const {add, subtract} = require('./math.mjs')
// requiring all named exports as an object
// const math = require(./math.mjs);

// Default export
// In ES module
// export default ...
// In commonJS module
// module.exports = ...

// Named exports
// In ES module
// export { module1, module2, ... }
// In commonJS module
// module.exports = { module1, module2, ... }

// Top-level await
// Unlike commonJS, ES supports top-level awaits, allowing us to using await outside 
// async functions at module level.
// There are used for loading configuration from files and remote sources
// For connecting to databases before export functionality
// Conditional imports or module initialization

// console.log('Loading data!');
// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
// const data = await response.json();
// console.log(data);


