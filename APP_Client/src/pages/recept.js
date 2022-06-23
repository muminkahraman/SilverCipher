import React from 'react';
import '../App.css';

const script = require('../script')

/*
const crypto = require("crypto");
const fs = require("fs");

// Using 256-bit AES here
const algorithm = "aes-256-cbc";
const key = "22975a65b34aefb6227084727f27bfaa";
//let iv =    "6787654567765434567889576576737767876545677654345678895765767377";
const iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");

const src = fs.createReadStream("2099058.png");
const output = fs.createWriteStream("tesdddt.enc");
const cipher = crypto.createCipheriv(algorithm, key, iv);
src.pipe(cipher).pipe(output); 
*/

function Recept() {
  return (
    <div onClick={script.cryptTest}>
      Boite de r&#xE9;ception      
    </div>
  );
}

export default Recept;
