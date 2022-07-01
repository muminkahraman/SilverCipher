// Importing Required Modules
const crypto = require('crypto');
const fs = require('fs');
 
// Creating keys
const Public = fs.readFileSync('./public.pem').toString();
const Private = fs.readFileSync('./private.pem').toString();
const FalsePrivate = fs.readFileSync('./private.pem').toString().replace('IDm7RC','eeeeee');
console.log(FalsePrivate);

// Using Hashing Algorithm
const algorithm = "SHA256";
 
// Getting data
const data = Buffer.from(fs.readFileSync('./logo192.png').toString('base64'), 'base64');

// Sign the data and returned signature in buffer
const signature = crypto.sign(algorithm, data, FalsePrivate);

// Verifying signature using crypto.verify() function
const isVerified = crypto.verify(algorithm, data, Public, signature);
 
// Printing the result
console.log(`Is signature verified: ${isVerified}`);
