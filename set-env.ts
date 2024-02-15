// Configure Angular `environment.prod.ts` file path
// @ts-ignore
const targetPath = process.env.PRODUCTION ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';

// Load node modules
// tslint:disable-next-line:no-var-requires
require('dotenv').config();
// @ts-ignore
// tslint:disable-next-line:no-var-requires
const fs = require('fs');

// `environment.prod.ts` file structure
// @ts-ignore
const envConfigFile = `export const environment = {
  appName: '${process.env.APP_NAME || ''}',
  apiUrl: '${process.env.API_URL || ''}',
  envName: '${process.env.ENV_NAME}',
  production: ${process.env.PRODUCTION},
  hmr: ${process.env.HMR},
  debug: ${process.env.DEBUG},
  encryptKey: '${process.env.ENCRYPT_KEY || ''}',
  sentryDsn: '${process.env.SENTRY_DSN || ''}',
  socketType: '${process.env.SOCKET_TYPE || ''}',
  centrifugoUrl: '${process.env.CENTRIFUGO_URL || ''}',
};
`;
console.log('The file `environment.prod.ts` will be written with the following content: \n');
console.log(envConfigFile);
fs.writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});
