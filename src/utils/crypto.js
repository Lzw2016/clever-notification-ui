import * as CryptoJS from 'crypto-js';
import { CryptoConfig } from './constant';

// AES密钥
const AESKey = CryptoConfig.AES.key;
// AES向量
const AESIv = CryptoConfig.AES.iv;

/**
 * AES加密，返回Base64编码
*/
export function AESEncrypt(str) {
  const encrypted = CryptoJS.AES.encrypt(str, CryptoJS.enc.Hex.parse(AESKey), {
    iv: CryptoJS.enc.Hex.parse(AESIv),
    // mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

/**
 * AES解密,参数Base64编码
 */
export function AESDecrypt(str) {
  const decrypted = CryptoJS.AES.decrypt(str, CryptoJS.enc.Hex.parse(AESKey), {
    iv: CryptoJS.enc.Hex.parse(AESIv),
    // mode: CryptoJS.mode.CBC,
    // padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
