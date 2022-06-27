const app = window.require('electron').remote
const fs = app.require('fs')
const crypto = app.require("crypto");
const Store = app.require('electron-store');
const store = new Store();
//const axios = app.require("axios");
var pass;

function resetStore() {
    store.clear()
}

function signUp(username, email, telephone, password) {
    store.set('User', { 'username': username, 'email': email, 'phone': telephone, 'password': password },
    )
}

function signIn(password) {
    pass = (password === store.get('User.password'))
}

function getPass() {
    return pass;
}

function testUser() {
    console.log(store.get('User.username') === undefined);
    console.log(store.get('User.username'))
}

function testConnecte() {
    return store.get('User.username') === undefined;
}

function getName() {
    return store.get('User.username');
}

function colorNav(paramId) {
    const recept = document.getElementById('recept')
    if (recept) {
        recept.style.backgroundColor = '#580aa5';
        recept.style.color = 'white';
    }
    const envoi = document.getElementById('envoi')
    if (envoi) {
        envoi.style.backgroundColor = '#580aa5';
        envoi.style.color = 'white';
    }
    const brouillon = document.getElementById('brouillon')
    if (brouillon) {
        brouillon.style.backgroundColor = '#580aa5';
        brouillon.style.color = 'white';
    }
    const blank = document.getElementById(paramId)
    if (blank) { 
        blank.style.backgroundColor = 'white'; 
        blank.style.color = 'black';
    }
}

function cryptTest() {
    const algorithm = "aes-256-cbc";
    const key = "22975a65b34aefb6227084727f27bfaa";
    //let iv =    "6787654567765434567889576576737767876545677654345678895765767377";
    const iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");

    const src = fs.createReadStream("2099058.png");
    const output = fs.createWriteStream("tesdddt.enc");
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    src.pipe(cipher).pipe(output);
}





module.exports = {
    colorNav,
    cryptTest,
    signUp,
    signIn,
    getPass,
    testUser,
    resetStore,
    testConnecte,
    getName
}