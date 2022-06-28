const app = window.require("electron").remote;
const fs = app.require("fs");
const crypto = app.require("crypto");
const Store = app.require("electron-store");
const store = new Store();
const axios = app.require("axios");
const FormData = app.require("form-data");

const signUp = async (username, email, telephone, password) => {
    store.set("User", {
        username: username,
        email: email,
        phone: telephone,
        password: password,
    });
    let randomString1 = crypto.randomBytes(16).toString("hex");
    console.log(randomString1);
    axios
        .post("http://localhost:3001/api/user", {
            pseudo: username,
            mail: email,
            tel: telephone,
            cle_publique: randomString1,
            path_cert: "path_cert",
        })
        .then((response) => {
            console.log(response.data);
        });
    genRsa(randomString1);
    let form = new FormData();
    form.append(
        "file",
        fs.createReadStream("./keys/private.pem"),
        randomString1 + ".pem"
    );
    await axios
        .post("http://localhost:3001/api/upload/pub_key", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => {
            console.log(response.data);
        });
};

const symEncipher = (path) => {
  let src = fs.createReadStream(path);
  let key = crypto.randomBytes(16).toString("hex");
  let name = crypto.randomBytes(16).toString("hex");
  let algorithm = "aes-256-cbc";
  console.log(name);
  let iv = Buffer.from("979843777c873b5a2060c2ad968a20d9", "hex");
  let output = fs.createWriteStream("./temp/" + name);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  src.pipe(cipher).pipe(output);
  let keyfile = crypto.randomBytes(16).toString("hex");
  let output2 = fs.writeFileSync("./temp/" + keyfile, key);
  return { name, keyfile };
};

const sendMessage = () => {
    let { namee, keyfile } = symEncipher("./2099058.png");
    const dataToEncrypt = fs.readFileSync('./temp/' + keyfile, { encoding: "utf-8" });

    const publicKey = Buffer.from(
        fs.readFileSync("./keys/public.pem", { encoding: "utf-8" })
    );

    const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(dataToEncrypt)
    );

    fs.writeFileSync(
        "./temp/encrypted_data.txt",
        encryptedData.toString("base64"),
        { encoding: "utf-8" }
    );
};

sendMessage();

function getusername() {
    console.log(store.get("User.username"));
}

function colorNav(paramId) {
    const recept = document.getElementById("recept");
    if (recept) {
        recept.style.backgroundColor = "grey";
    }
    const envoi = document.getElementById("envoi");
    if (envoi) {
        envoi.style.backgroundColor = "grey";
    }
    const brouillon = document.getElementById("brouillon");
    if (brouillon) {
        brouillon.style.backgroundColor = "grey";
    }
    const blank = document.getElementById(paramId);
    if (blank) {
        blank.style.backgroundColor = "white";
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

const getUsers = () => {
    axios.get("http://localhost:3001/api/user/all").then((response) => {
        store.set("users", response.data);
    });
};

const genRsa = () => {
    let { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
    });

    const exportedPublicKeyBuffer = publicKey.export({
        type: "pkcs1",
        format: "pem",
    });
    fs.writeFileSync("./keys/public.pem", exportedPublicKeyBuffer, {
        encoding: "utf-8",
    });

    const exportedPrivateKeyBuffer = privateKey.export({
        type: "pkcs1",
        format: "pem",
    });
    fs.writeFileSync("./keys/private.pem", exportedPrivateKeyBuffer, {
        encoding: "utf-8",
    });
};

module.exports = {
    colorNav,
    cryptTest,
    signUp,
    getusername,
    getUsers,
};
