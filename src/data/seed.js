/* eslint-disable no-console */
import { up as seedEvent, down as flushEvent } from './seeders/event';
import { up as seedGroup, down as flushGroup } from './seeders/group';
import { up as seedUser, down as flushUser } from './seeders/user';

import {
  up as seedSubmission,
  down as flushSubmission,
} from './seeders/submission';

import { up as seedTopics, down as flushTopics } from './seeders/topic';
import {
  up as seedUserTopic,
  down as flushUserTopic,
} from './seeders/user_topic';

import config from '../config';

const up = async () => {
  console.log('Starting to seed');
  try {
    await seedTopics()
      .then(seedUser)
      .then(seedSubmission)
      .then(seedUserTopic)
      .then(seedGroup)
      .then(seedEvent);
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
    await flushTopics()
      .then(flushUser)
      .then(flushSubmission)
      .then(flushUserTopic)
      .then(flushGroup)
      .then(flushEvent);
  } catch (e) {
    console.error('Failed to flush', e);
    process.exit(1);
  }

  console.log('Flush successful');
  process.exit(0);
};

console.log('db config', config.db);
if (config.db.database.indexOf('prod') !== -1) {
  throw Error("Can't seed the production database");
}

const command = process.argv[2];
if (command === 'up') {
  up();
} else if (command === 'down') {
  down();
} else {
  console.error('Wrong command given');
  process.exit(1);
}
