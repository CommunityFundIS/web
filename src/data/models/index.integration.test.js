/* eslint-env jest */
/* eslint-disable global-require, no-console */


// import * as dbScripts from '../dbScripts';
import { pgp } from '../db';

// beforeEach(async () => {
//   await dbScripts.dropSchema();
//   await dbScripts.createSchema();
// });

afterEach(async () => pgp.end());

describe('Postgres integration tests', () => {
  require('./User.integration.test');
});

// process.on('unhandledRejection', (reason) => {
//   console.error(reason);
//   process.exit(1);
// });
