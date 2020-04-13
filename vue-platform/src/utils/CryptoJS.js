'use strict'

const CryptoJS = require('crypto-js');  //引用AES源码js
    
const key = CryptoJS.enc.Utf8.parse("86f1fda459fa47c7");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('27a853d2d7064dfb');   //十六位十六进制数作为密钥偏移量

export default {
    //解密方法
    Decrypt(word,currentkey) {
        currentkey = CryptoJS.enc.Utf8.parse(currentkey);
        let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        let decrypt = CryptoJS.AES.decrypt(srcs, currentkey, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedStr.toString());
    },

    //加密方法
    Encrypt(word,currentkey) {
        currentkey = CryptoJS.enc.Utf8.parse(currentkey);
        let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word));
        let encrypted = CryptoJS.AES.encrypt(srcs, currentkey, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.ciphertext.toString().toUpperCase();
    },
    /**
	 * 获取16进制随机数
	 * @param len
	 * @return
	 * @throws CoderException
	 */
	randomHexString(len)  {
        var hexStr = '0123456789ABCDEF';
        var result = '';
        for(var i=0;i<len;i++) {
            var random = Math.floor(Math.random()*16);
            result += hexStr.charAt(random);
        }
        return result.toUpperCase();
	},
}