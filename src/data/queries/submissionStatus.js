import { GraphQLID as ID, GraphQLNonNull as NonNull } from 'graphql';
import SubmissionStatusType from '../types/SubmissionStatusType';
import { Vote, Submission, User } from '../models';

export const submissionResult = async submissionId => {
  const BOARD_MEMBERS = 5;
  const MIN_AMOUNT_OF_VOTES = 3;

  const votes = await Vote.findAll({
    where: {
      submissionId,
    },
  });

  const numberOfAccepted = votes.filter(
    vote => vote.result === 'accepted'
  ).length;
  const remainingVotes = BOARD_MEMBERS - votes.length;

  if (numberOfAccepted >= MIN_AMOUNT_OF_VOTES) {
    return 'accepted';
  } else if (remainingVotes < MIN_AMOUNT_OF_VOTES) {
    return 'rejected';
  } else {
    return 'pending';
  }
};

export const getSubmissionStatus = async ({ submissionId, anonymized }) => {
  const submission = await Submission.findById(submissionId);

  if (!submission) {
    throw Error("Submission doesn't exist");
  }

  let votesForSubmission = await Vote.findAll({
    where: {
      submissionId,
    },
  });

  if (anonymized) {
    votesForSubmission = votesForSubmission.map(vote => {
      vote.userId = null;
      return vote;
    });
  }

  return {
    result: submission.result || 'pending',
    votes: votesForSubmission,
  };
};

const submissionStatus = {
  type: SubmissionStatusType,
  args: {
    submissionId: {
      type: new NonNull(ID),
    },
  },
  resolve: async ({ req }, { submissionId }) =>
    getSubmissionStatus({ submissionId, anonymized: !req.user }),
};

export default submissionStatus;
