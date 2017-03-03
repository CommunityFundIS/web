/* eslint-env mocha */

import { expect } from 'chai';
import { getUsers } from './User';
// import * as dbScripts from '../dbScripts';

describe('getUsers', () => {
  it('should return an empty array if no user exist', async () => {
    const users = await getUsers();
    expect(users).to.deep.equal([]);
  });

  it('should get all existing users', async () => {
    // await dbScripts.dropData();
    // await dbScripts.insertDummyData();

    const users = await getUsers();
    expect(users.length).to.be.above(0);
  });
});
