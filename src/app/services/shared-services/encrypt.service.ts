import { environment } from './../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor() {}

  // The set method is use for encrypt the value.
  encrypt(keys: string, value: string) {
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key, {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  AESEncrypt(message: any) {
    const encryptedImsMasterId = CryptoJS.AES.encrypt(message, environment.aesKey).toString();
    return encryptedImsMasterId;
  }
}
