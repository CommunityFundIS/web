/* eslint-disable import/prefer-default-export */
import { User } from '../models';
import { log } from '../../logger';

export const up = async () => {
  log('User: Seeding');

  await User.sync();

  await User.bulkCreate(
    [0, 1, 2, 3, 4].map(i => ({
      email: `test${i}@test.com`,
      name: `Reviewer ${i}`,
      isReviewer: true,
      password: User.generateHash('test'),
    })),
  );

  await User.create({
    email: `kristjanmik@gmail.com`,
    name: `Operator 1`,
    isReviewer: true,
    isOperator: true,
    password: User.generateHash('test'),
  });

  log('User: Done seeding');
};

export const down = async () => {
  log('User: Flushing');

  await User.sync();

  await User.truncate();

  log('User: Done Flushing');
};
