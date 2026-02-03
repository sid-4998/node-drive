// The URL module provides utilities for URL resolution and parsing
// It can be used to split up a web address into readable parts
// It can be used to contruct URLs
// It helps in handling different URL components

// Including the URL module
// Using the legacy API
// const url = require('url');

// Using the modern URL class(WHATWG API)
// const { URL } = require('url');

// url.parse() method(Used with legacy API)
// It parses the web address and return an object with each component as properties

// URL object properties
// Since the .parse() method is deprecated, we will be using the WHATWG API

const { URL, URLSearchParams } = require('url');
const URLObject = new URL('https://example.org:8080/p/a/t/h?year=2026&month=february#hash');
const params = new URLSearchParams(URLObject.search);
// The URLObject has several properties
console.log(URLObject.href); // The full URL that was parsed
console.log(URLObject.protocol); // The protocol scheme(http,https)
console.log(URLObject.host); // The full host portion (example.org:8080)
console.log(URLObject.hostname); // The hostname portion (example.org)
console.log(URLObject.port) // The port number if specified
console.log(URLObject.pathname); // The path section of the URL
console.log(URLObject.search); // The query string including the leading ?
console.log(URLObject.searchParams.toString()); // The query string without ?
console.log(URLObject.hash); // The fragment identifier including the hash

// URLSearchParams API
// This API provides utility methods to work with the query string of the url
console.log(params.get('year')); // Get a query parameter
params.append('category', 'tech'); // Add a new query parameter with its value
params.append('category', 'news'); 
params.append('category', 'space');
console.log(params.getAll('category')); // Returns an array of category(query parameter) values
params.delete('category', 'space'); // Deleting the category query parameter with value 'space'
console.log(params.getAll('category'));
// The keys() method returns an iterator over the names of each name-value pair of query parameters
for(const name of params.keys()) console.log(name);
// The values() method returns an iterator over the values of each name-value pair of query parameters
for(const value of params.values()) console.log(value);
// The entries() method returns an iterator over the name-value pairs of query parameters
// Each item of the iterator is a JavaScript array with 2 elements.
// The first element is the query paramenter name
// The second parameter is the query parameter value associated with that name
for(const entry of params.entries()) console.log(entry);

// Constructing URLs safely
// The encodeURIComponent() method encodes a specific component of URL.

function createProfileUrl(domain, username) {
  return new URL(`/users/${encodeURIComponent(username)}`, domain).href;
}

console.log(createProfileUrl('https://example.com', 'johndoe'));