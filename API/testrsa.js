const crypto = require('crypto')
const fs = require('fs')

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
})

// *********************************************************************
//
// To export the public key and write it to file:

const exportedPublicKeyBuffer = publicKey.export({ type: 'pkcs1', format: 'pem' })
fs.writeFileSync('public.pem', exportedPublicKeyBuffer, { encoding: 'utf-8' })
// *********************************************************************


// *********************************************************************
//
// To export the private key and write it to file

const exportedPrivateKeyBuffer = privateKey.export({ type: 'pkcs1', format: 'pem' })
fs.writeFileSync('private.pem', exportedPrivateKeyBuffer, { encoding: 'utf-8' })

// *********************************************************************

const dataToEncrypt = fs.createReadStream('random-user.jpg')

const publiccKey = Buffer.from(fs.readFileSync('public.pem', { encoding: 'utf-8' }))

const encryptedData = crypto.publicEncrypt(
  {
    key: publiccKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256',
  },
  // We convert the data string to a buffer using `Buffer.from`
  Buffer.from(dataToEncrypt)
)

fs.createWriteStream('encrypted_data.txt', encryptedData.toString('base64'), { encoding: 'utf-8' })