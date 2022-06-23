const app = window.require('electron').remote
const fs = app.require('fs')
const crypto = app.require("crypto");


function colorNav(paramId) {
    const recept = document.getElementById('recept')
    if (recept) {recept.style.backgroundColor='grey';}
    const envoi = document.getElementById('envoi')
    if(envoi) {envoi.style.backgroundColor='grey';}
    const brouillon = document.getElementById('brouillon')
    if (brouillon) {brouillon.style.backgroundColor='grey';}
    const blank = document.getElementById(paramId)
    if (blank) {blank.style.backgroundColor='white';}
}

function cryptTest() {
    const algorithm = "aes-256-cbc";
    const key = "22975a65b34aefb6227084727f27bfaa";
    //let iv =    "6787654567765434567889576576737767876545677654345678895765767377";
    const iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
    
    const src = fs.createReadStream("2099058.png");
    const output = fs.createWriteStream("tesdddt.enc");
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    src.pipe(cipher).pipe(output); }


module.exports = {
    colorNav,
    cryptTest
}