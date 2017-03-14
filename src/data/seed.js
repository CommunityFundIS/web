/* eslint-disable no-console */
import {
  up as seedUser,
  down as flushUser,
} from './seeders/user';

import {
  up as seedSubmission,
  down as flushSubmission,
} from './seeders/submission';

const up = async () => {
  console.log('Starting to seed');
  try {
    await Promise.all([
      seedUser(),
      seedSubmission(),
    ]);
  } catch (e) {
    console.error('Failed to seed', e);
    process.exit(1);
  }

  console.log('Seed successful');
  process.exit(0);
};

const down = async () => {
  console.log('Starting to flush');
  try {
    await Promise.all([
      flushUser(),
      flushSubmission(),
    ]);
  } catch (e) {
    console.error('Failed to flush', e);
    process.exit(1);
  }

  console.log('Flush successful');
  process.exit(0);
};


const command = process.argv[2];
if (command === 'up') {
  up();
} else if (command === 'down') {
  down();
} else {
  console.error('Wrong command given');
  process.exit(1);
}
