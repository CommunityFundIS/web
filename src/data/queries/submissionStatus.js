import { GraphQLID as ID, GraphQLNonNull as NonNull } from 'graphql';
import SubmissionStatusType from '../types/SubmissionStatusType';
import { Vote, Submission } from '../models';

export const submissionResult = async submissionId => {
  const BOARD_MEMBERS = 5;
  const MIN_AMOUNT_OF_VOTES = 3;

  const votes = await Vote.findAll({
    where: {
      submissionId
    }
  });

  const numberOfAccepted = votes.filter(vote => vote.result === 'accepted')
    .length;
  const remainingVotes = BOARD_MEMBERS - votes.length;

  if (numberOfAccepted >= MIN_AMOUNT_OF_VOTES) {
    return 'accepted';
  }

  if (remainingVotes === 0) {
    return 'rejected';
  }

  return 'pending';
};

export const getSubmissionStatus = async ({ submissionId, anonymized }) => {
  const [submission, allVotes] = await Promise.all([
    Submission.findById(submissionId),
    Vote.findAll({
      where: {
        submissionId
      }
    })
  ]);

  if (!submission) {
    throw Error("Submission doesn't exist");
  }

  let votes;
  if (anonymized) {
    votes = allVotes.map(vote => {
      const obj = { ...vote };
      obj.userId = null;
      return obj;
    });
  } else {
    votes = allVotes;
  }

  return {
    result: submission.result || 'pending',
    votes
  };
};

const submissionStatus = {
  type: SubmissionStatusType,
  args: {
    submissionId: {
      type: new NonNull(ID)
    }
  },
  resolve: ({ req }, { submissionId }) =>
    getSubmissionStatus({ submissionId, anonymized: !req.user })
};

export default submissionStatus;
