//var rsa = require("node-rsa");
var fs = require("fs");
const crypto = require('crypto')
const path = require('path')

/*
function GeneratePair(){ 
    var key = new rsa().generateKeyPair();

    var publicKey = key.exportKey("public");

    var privateKey = key.exportKey("private");

    fs.openSync("./Keys/public.pem", "w");
    fs.writeFileSync("./Keys/public.pem", publicKey, "utf8");

    fs.openSync("./Keys/private.pem", "w");
    fs.writeFileSync("./Keys/private.pem", privateKey, "utf8");
}
*/

function GeneratePairCrypto(){

    crypto.generateKeyPair('rsa', {
    modulusLength: 4096,
    publicExponent: 0x10101,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        
    }
    }, (err, publicKey, privateKey) => { // Callback function
    if(!err)
    {
        // This will print the asymmetric key pair
        console.log("Public Key is: ", publicKey);
        fs.openSync("./Keys/public.pem", "w");
        fs.writeFileSync("./Keys/public.pem", publicKey, "utf8");
        console.log();
        console.log("Private Key is: ", privateKey);
        fs.openSync("./Keys/private.pem", "w");
        fs.writeFileSync("./Keys/private.pem", privateKey, "utf8");
    }
    else
    {
        // Prints error if any
        console.log("Errr is: ", err);
    }
    });
}

//GeneratePair();
GeneratePairCrypto();