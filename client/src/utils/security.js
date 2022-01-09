var CryptoJS = require("crypto-js");
var key_code = "86758576376418652952657157128997";

export function encriptarJson(encriptarDatos) {
    var ciphertext = CryptoJS.AES.encrypt(encriptarDatos, key_code).toString();
    return ciphertext;
}

export function desencriptarJson(encriptarDatos) {
    var bytes = CryptoJS.AES.decrypt(encriptarDatos, key_code);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}