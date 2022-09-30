import {encrypt, decrypt} from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

export const encryptWithAES = (text: string, secret: string) => {
  return encrypt(text, secret).toString();
};

export const decryptWithAES = (text: string, secret: string) => {
  const bytes = decrypt(text, secret);
  return bytes.toString(Utf8);
};



