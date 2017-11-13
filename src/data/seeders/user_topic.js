/* eslint-disable import/prefer-default-export */
import { User, Topic, UserTopic } from '../models';
import { log } from '../../logger';

export const up = async () => {
  log('UserTopic: Seeding');

  await UserTopic.sync();
  await User.sync();
  await Topic.sync();

  const user = await User.findOne({
    where: {
      email: 'kristjanmik@gmail.com',
    },
  });

  const topic1 = await Topic.findOne({
    where: {
      name: 'ux',
    },
  });

  const topic2 = await Topic.findOne({
    where: {
      name: 'development',
    },
  });

  const topic3 = await Topic.findOne({
    where: {
      name: 'art',
    },
  });

  await UserTopic.bulkCreate([
    {
      userId: user.id,
      topicId: topic1.id,
      order: 1,
    },
    {
      userId: user.id,
      topicId: topic2.id,
      order: 2,
    },
    {
      userId: user.id,
      topicId: topic3.id,
      order: 3,
    },
  ]);

  log('UserTopic: Done seeding');
};

export const down = async () => {
  log('UserTopic: Flushing');

  await UserTopic.sync();

  await UserTopic.truncate();

  log('UserTopic: Done Flushing');
};
