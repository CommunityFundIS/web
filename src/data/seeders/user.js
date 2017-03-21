/* eslint-disable import/prefer-default-export */
import { User } from '../models';

export const up = async () => {
  console.log('User: Seeding');

  await User.sync();

  await User.bulkCreate(
    [0, 1, 2, 3, 4].map(i => {
      return {
        email: `test${i}@test.com`,
        name: `Reviewer ${i}`,
        isReviewer: true,
        password: User.generateHash('test'),
      };
    })
  );

  console.log('User: Done seeding');
};

export const down = async () => {
  console.log('User: Flushing');

  await User.sync();

  await User.truncate();

  console.log('User: Done Flushing');
};
