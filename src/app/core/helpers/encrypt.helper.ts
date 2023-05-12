import { environment } from '@env/environment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const instance = require('simple-encryptor')(environment.encryptKey);

export const encrypt = (payload: any) => {
  return instance.encrypt(payload);
};

export const decrypt = (payload: string) => {
  return instance.decrypt(payload);
};

// const instance = new JSEncrypt();
// instance.setKey(environment.encryptKey);

// export const encrypt = (payload: any) => {
//   return instance.encrypt(payload);
// };

// export const decrypt = (payload: string) => {
//   return instance.decrypt(payload);
// };
