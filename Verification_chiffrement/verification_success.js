// Importing Required Modules
const crypto = require('crypto');
const fs = require('fs');
 
// Creating keys
const Public = fs.readFileSync('./public.pem');

const Private = fs.readFileSync('./private.pem');

// Using Hashing Algorithm
const algorithm = "SHA256";
 
// Getting data
const data = fs.readFileSync('./logo192.png');

// Sign the data and returned signature in buffer
const signature = crypto.sign(algorithm, data, Private);
console.log(signature)

fs.writeFileSync('./signature',signature);


let signatureLue = Buffer.from(fs.readFileSync('./signature'));
console.log(signatureLue)

// Verifying signature using crypto.verify() function
const isVerified = crypto.verify(algorithm, data, Public, signatureLue);
 
// Printing the result
console.log(`Is signature verified: ${isVerified}`);
