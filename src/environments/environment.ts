/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  backend: 'http://localhost:3000/',
  address: 'Thane, Thane - 400605',
  encKey: 'b417cf7714f5c803ac31ea7ea4ee3a11',
  aesKey: 'b417cf7714f5c803ac31ea7ea4ee3a11',
  razorpayKeyId: 'rzp_test_1JFxmyJ8eg8wQZ',
  zoomLiveURL: 'http://localhost:4000/#/live',
  SOCKET_ENDPOINT: 'http://localhost:3000/classMasterSocketConnection',
};
