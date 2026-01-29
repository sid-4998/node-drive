// Promises are used to handle asynchronous operations efficiently
// Better error handling with .catch() method
// Helps in avoiding callback hell

// Creating a promise

// Here Promise is a constructor
// which uses an executor function 
// with 2 callbacks as arguments

const myPromise = new Promise((resolve, reject) => { 
    // Producing code
    const success = Math.random() > 0.5;
    if(success) {
        setTimeout(() => {
            resolve("Success");
        }, 1000)
    } else {
        reject("Failure");
    }
});

myPromise.then(
    // Consuming code
    (success) => {
        console.log(success);
    },
    (failure) => {
        console.log(failure);
    }
);

// .then() method uses 2 callbacks, namely the success and failure callbacks
// The success callback consumes and processes the result of a resolved promise
// The failure callback handles the error caused by the rejected promise

// Alternativley we can use the .catch() method for error handling in case of 
// rejected promises. It can be chained with the .then() method as shown below.

myPromise.then(
    (success) => console.log(success)
).catch(
    (error) => console.error(error)
);

// The .catch() method is similar to .then(null, errorHandler);

// .finally() method executes code regardless of whether a promise is fullfiled or rejected

myPromise
.then(
    (success) => {
        console.log(success);
    }
).catch(
    (error) => {
        console.error(error);
    }
).finally(
    () => console.log("Operation completed!")
);

// The .then(), .catch() and .finally() are called instance methods

// Promise chaining
// Promises can be chained to execute asynchronous operations in a sequence with 
// each .then() recieving the result of the previous operation

function getUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({id: userId, name: 'Siddhant'});
        }, 1000);
    });
}

function getName(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user.name);
        }, 1000);
    });
}

getUser(1)
.then(
    (userData) => {
        console.log(userData);
        return getName(userData);
    }
)
.then(
    (name) => {
        console.log(name);
    }
)
.catch(
    (error) => {
        console.error(error);
    }
);

// At first the getUser(1) returns a reolved promise of userData
// That userData is consumed by the .then() method which sends this userData
// to the getName() method. 
// After getName(userData) returns a resolved promise of name, that 
// is again consumed by another .then() method.

// Utility methods
Promise.resolve('Created a resolved promise!').then(data => console.log(data));
Promise.reject('Created a rejected promise!').catch(error => console.error(error));

// Static methods
// Promise.all() method
// The Promise.all() method is used to run multiple promises in parallel and waits 
// for all promises to complete. It fails if any one of those promises fail

const promise1 = new Promise((resolve) => setTimeout(() => resolve('First'), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Second'), 1000));
const promise3 = new Promise((resolve) => setTimeout(() => resolve('Third'), 1000));

Promise.all([promise1, promise2, promise3])
.then(
    (results) => {
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
    }
).catch(
    (error) => {
        console.error(error);
    }
)

// Promise.race() method
// This method is useful when we need the result of the first fullfiled or rejected promise.

const promise4 = new Promise((resolve) => setTimeout(() => resolve('Faster'), 500));
const promise5 = new Promise((resolve) => setTimeout(() => resolve('Slower'), 1000));

Promise.race([promise4, promise5])
.then(
    (result) => {
        console.log(result);
    }
).catch(
    (error) => {
        console.error(error);
    }
)

// Async/Await
// These are another way of handling asynchronous operations.
// They are similar to promises but with more readable and easier to debug syntax

// async keyword
// This keyword is used to declare an asynchronous function that return a promise

// await keyword
// This keyword pauses the code execution untill a promise is resolved.
// It can only be used inside an asynchronous function

// Basic example

async function getData() { // Returns a promise resolved by someAsyncOperation()
    console.log('Starting operation');
    const result = await someAsyncOperation();
    console.log(`Result: ${result}`);
    return result;
}

function someAsyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Operation completed!');
        }, 3000);
    });
}

getData() // The returned promise is then consumed.
.then(
    (data) => {
        console.log(data);
    }
)
.catch(
    (error) => {
        console.error(error);
    }
)

// Sequential vs Parallel operations
// Although async/await makes code look synchronous, sometimes we may need to run 
// operarions in parallel for better performance

function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data for Id: ${id}`);
        }, 1000);
    });
}

// Sequential operation - Takes 3 seconds
async function fetchSequentially() {
    console.time('Sequential');
    const data1 = await fetchData(1);
    const data2 = await fetchData(2);
    const data3 = await fetchData(3);
    console.timeEnd('Sequential');
    return [data1, data2, data3];
}

// Parallel operation - Takes 1 second
async function fetchParallely() {
    console.time('Parallel');
    const data = await Promise.all([
        fetchData(1), 
        fetchData(2),
        fetchData(3)
    ]);
    console.timeEnd('Parallel');
    return data;
}

async function run() {
    console.log('Running sequentially');
    const seqResults = await fetchSequentially();
    console.log(seqResults);
    
    console.log('Running parallely');
    const parResults = await fetchParallely();
    console.log(parResults);
}

run();