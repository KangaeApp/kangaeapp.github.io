var CryptoJS = require("crypto-js");

// Decrypt
var bytes  = CryptoJS.AES.decrypt('U2FsdGVkX1+DEuTUckU8SWPMMm65nhMLY0Ap80IM/XO43tESbJSXV1eSTqMKN+ZTJJ0DRtHspidsub3qJNNpaQ==');
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
console.log(originalText.length === 0); // 'my message'