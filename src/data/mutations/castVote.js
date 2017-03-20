import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import moment from 'moment';
import SubmissionType from '../types/SubmissionType';
import { Submission, User, Vote } from '../models';
import { logError } from '../../logger';
import { isDev, googleRecaptchaSecret } from '../../config';
import fetch from '../../core/fetch';

const castVote = {
  type: SubmissionType,
  args: {
    submissionId: { type: new NonNull(StringType) },
    comment: { type: StringType },
    result: { type: new NonNull(StringType) },
  },
  resolve: async (
    { req },
    {
      submissionId,
      comment,
      result,
    }
  ) => {
    if (!req.user) {
      throw Error('Must be authenticated');
    }

    const user = await User.findById(req.user.id);

    if (!user.isReviewer) {
      throw Error('Unauthorized');
    }

    let vote;

    try {
      vote = await Vote.create({
        submissionId,
        comment,
        result,
        userId: user.id,
      });
    } catch (e) {
      logError(e);
      throw e;
    }

    return vote;
  },
};

export default castVote;
