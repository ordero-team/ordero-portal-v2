// Taken from https://github.com/danang-id/simple-crypto-js
import { AES, enc as encoder, Encoder, lib, mode, pad, PBKDF2, WordArray } from 'crypto-js';

export class Encryptor {
  private _secret: string;
  private readonly _keySize: number;
  private readonly _iterations: number;

  constructor(secret: string) {
    if (secret === void 0) {
      throw new Error('Crypto object MUST BE initialised with a SECRET KEY.');
    }
    this._secret = secret;
    this._keySize = 256;
    this._iterations = 100;
  }

  public static generateRandom(length = 128, expectsWordArray = false): any | WordArray {
    const random = lib.WordArray.random(length / 8);
    return expectsWordArray ? random : random.toString();
  }

  public encrypt(data: object | string | number | boolean): string {
    if (data === void 0) {
      throw new Error('No data was attached to be encrypted. Encryption halted.');
    }
    const string: string =
      typeof data === 'object'
        ? JSON.stringify(data)
        : typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean'
        ? data.toString()
        : null;

    if (null === string) {
      throw new Error('Only object, string, number and boolean data types that can be encrypted.');
    }

    const salt: any | WordArray = Encryptor.generateRandom(128, true);
    const key: WordArray = PBKDF2(this._secret, salt, {
      keySize: this._keySize / 32,
      iterations: this._iterations,
    });
    const initialVector: any | WordArray = Encryptor.generateRandom(128, true);
    const encrypted: WordArray = AES.encrypt(string, key, {
      iv: initialVector as string,
      padding: pad.Pkcs7,
      mode: mode.CBC,
    });
    return salt.toString() + initialVector.toString() + encrypted.toString();
  }

  public decrypt(ciphered: string, expectsObject = false, enc: Encoder = encoder.Utf8): string | object {
    if (ciphered === void 0) {
      throw new Error('No encrypted string was attached to be decrypted. Decryption halted.');
    }
    const salt: string = encoder.Hex.parse(ciphered.substr(0, 32));
    const initialVector: string = encoder.Hex.parse(ciphered.substr(32, 32));
    const encrypted: string = ciphered.substring(64);
    const key: any | WordArray = PBKDF2(this._secret, salt, {
      keySize: this._keySize / 32,
      iterations: this._iterations,
    });
    const decrypted = AES.decrypt(encrypted, key, {
      iv: initialVector,
      padding: pad.Pkcs7,
      mode: mode.CBC,
    });
    return expectsObject ? JSON.parse(decrypted.toString(enc)) : decrypted.toString(enc);
  }

  public encryptObject(object: object): string {
    return this.encrypt(object);
  }

  public decryptObject(string: string): object {
    const decrypted: string | object = this.decrypt(string, true);
    return typeof decrypted === 'object' ? decrypted : JSON.parse(decrypted);
  }

  public setSecret(secret: string): void {
    this._secret = secret;
  }
}
