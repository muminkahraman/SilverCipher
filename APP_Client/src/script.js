const app = window.require("electron").remote;
const fs = app.require("fs");
const crypto = app.require("crypto");
const Store = app.require("electron-store");
const store = new Store();
const axios = app.require("axios");


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

const getUsers = () => {
    axios.get("http://localhost:3001/api/user/all").then((response) => {
        store.set("users", response.data);
    });
};

module.exports = {
    sendMessage,
    getUsers,
};
