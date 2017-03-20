/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { Submission, Vote, User } from '../models';

export const up = async () => {
  console.log('Submission: Seeding');

  await Submission.sync();
  await Vote.sync();

  const submission = await Submission.create({
    name: 'Kristjan',
    email: 'kristjan@foo.com',
    phone: '6961234',
    date: new Date(),
    summary: 'Some summary',
    description: 'Some description',
    askAmount: 30000,
    totalCost: 100000,
  });

  const reviewers = await User.findAll({
    isReviewer: true,
  });

  const comments = [
    'Complete non-sense',
    "Best submission I've seen",
    null,
    null,
  ];
  const answers = ['accepted', 'rejected', 'accepted', 'rejected'];

  await Vote.bulkCreate(
    reviewers.slice(1, 5).map((reviewer, i) => {
      const comment = comments[i];
      const result = answers[i];

      return {
        userId: reviewer.id,
        comment,
        result,
        submissionId: submission.id,
      };
    })
  );

  console.log('Submission: Done seeding');
};

export const down = async () => {
  console.log('Submission: Flushing');

  await Submission.sync();

  await Submission.truncate();

  console.log('Submission: Done Flushing');
};
