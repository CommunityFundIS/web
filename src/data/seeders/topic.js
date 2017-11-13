/* eslint-disable import/prefer-default-export */
import { Topic } from '../models';
import { log } from '../../logger';

export const up = async () => {
  log('Topic: Seeding');

  await Topic.sync();

  await Topic.bulkCreate([
    {
      name: 'ux',
      color: 'blue',
    },
    {
      name: 'development',
      color: 'green',
    },
    {
      name: 'data science',
      color: 'yellow',
    },
    {
      name: 'art',
      color: 'red',
    },
    {
      name: 'design',
      color: 'violet',
    },
  ]);

  log('Topic: Done seeding');
};

export const down = async () => {
  log('Topic: Flushing');

  await Topic.sync();

  await Topic.truncate();

  log('Topic: Done Flushing');
};
