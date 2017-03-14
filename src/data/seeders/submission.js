/* eslint-disable import/prefer-default-export */
import { Submission } from '../models';

export const up = async () => {
  console.log('Submission: Seeding');

  await Submission.sync();

  await Submission.create({
    name: 'Kristjan',
    email: 'kristjan@foo.com',
    phone: '6961234',
    date: new Date(),
    summary: 'Some summary',
    description: 'Some description',
    askAmount: 30000,
    totalCost: 100000,
  });

  console.log('Submission: Done seeding');
};

export const down = async () => {
  console.log('Submission: Flushing');

  await Submission.sync();

  await Submission.truncate();

  console.log('Submission: Done Flushing');
};
