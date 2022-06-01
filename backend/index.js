
const CryptoJS = require("crypto-js");
const moduloSuma = require("./suma");
console.log(moduloSuma.sum(8, 9))



console.log("hola");
// Encrypt
var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
var bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(ciphertext)
console.log(originalText); // 'my message'

const btc = CryptoJS.SHA256("hola");
console.log(btc)


