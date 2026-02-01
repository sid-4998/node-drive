// NPM stands for node package manager.
// A package is a set of files needed for a module.
// Modules are javascript libraries that can be used in a project

// Installing packages one by one
// npm install package1 package2 package3 ...

// Installing the exact version
// npm install package_name@version

// Installing without saving to package.json
// npm install --no-save package_name

// Installing every package 
// npm install

// Updating packages one by one
// npm update package1 package2 ...

// Checking outdated packages
// npm outdated

// Updating all packages
// npm update

// Global installation
// npm install -g package_name

// Removing packages
// npm uninstall package1 package2 ...

// Removing global packages
// npm uninstall -g package_name

// Removing packages and their dependencies
// npm uninstall --save package_name

// package.json file
// We can create a package.json file using npm init

// When we install a package, it is added to the dependencies section of package.json
// We can create a scripts section in package.json to run custom commands using npm run script_name.

// "scripts": {
//   "start": "node index.js",
//   "dev": "nodemon index.js",
//   "test": "jest",
//   "build": "webpack --mode production",
//   "lint": "eslint .",
//   "prepare": "husky install"
// }

// Dependencies vs devDependencies
// Unlike Dependencies, devDependencies are not installed in production.
// They are only used during development or testing of an application or a service
// Also used to install test and build tools
// Installing new packages automatically gets saved to dependencies by default

// Install a package and saving it to devDependencies
// npm install --save-dev package_name or npm install -D package_name

// We can create a "engines" section in package.json to specify node and npm version requirements
// "engines": {
//   "node": ">=14.0.0 <17.0.0",
//   "npm": ">=6.0.0"
// }

// Semantic versioning
// Node.js packages follow semantic versioning using a 3 part version number
// MAJOR.MINOR.PATCH
// MAJOR: Incremented for incompatible API changes
// MINOR: Incremented for backward-compatible new features
// PATCH: Incremented for backward-compatible bug fixes

// peerDependencies
// They are specified in package.json to indicate compatibility with other packages
// without actually including them.
// They tell users what packages are expected to be installed by them in their project

// Optional dependencies
// npm install --save-oprional package_name or npm install -O package_name
// They enhance functionality but are not required for core application to work.

// Using npm-check-updates package
// npm install -g npm-check-updates

// check for updates
// ncu

// Update package.json
// ncu -u

// Install updates
// npm install

// Security and auditing
// npm audit

// Fix security vulnerabilities
// npm audit fix

// Force fix all issues
// npm audit fix --force

// Troubleshooting common issues

// Cleaning the npm cache
// npm cache clean --force

// Deleting node_modules and re-installing
// rm -rf node_modules
// rm package-lock.json
// npm install

// Checking for peer dependency issues
// npm ls

// Fixing broken dependencies
// npm rebuild

// Best practices
// Always install dependencies with exact version for production to prevent unexpected updates
// Regularly update dependencies to use new features and security patches
// Use only required dependencies and keep them as less as possible
// Always check for security vulnerabilties by auditing and fixing your dependencies
// Always commit the lock file to version control
// Maintain the usage documentation of each dependency used in your application
