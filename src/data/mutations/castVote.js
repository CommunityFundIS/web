import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';
import moment from 'moment';
import SubmissionStatusType from '../types/SubmissionStatusType';
import { Submission, User, Vote } from '../models';
import { log, logError } from '../../logger';
import {
  getSubmissionStatus,
  submissionResult
} from '../queries/submissionStatus';

const castVote = {
  type: SubmissionStatusType,
  args: {
    submissionId: { type: new NonNull(StringType) },
    comment: { type: StringType },
    result: { type: new NonNull(StringType) }
  },
  resolve: async ({ req }, { submissionId, comment, result }) => {
    if (!req.user) {
      throw Error('Must be authenticated');
    }

    const user = await User.findById(req.user.id);

    if (!user || !user.isReviewer) throw Error('Unauthorized');

    try {
      await Vote.create({
        submissionId,
        comment,
        result,
        userId: user.id
      });
    } catch (e) {
      logError(e);
      throw e;
    }

    // There is a race condition here that could result in two emails sent.
    // Highly unlikely unless everyone votes at the same time

    const resultSoFar = await submissionResult(submissionId);
    log('Result so far', resultSoFar);
    if (resultSoFar !== 'pending') {
      log('The votes are in!');
      await Submission.update(
        { decidedOn: moment(), result: resultSoFar },
        { where: { id: submissionId }, fields: ['decidedOn', 'result'] }
      );

      // TODO: Send email to applicant on result
    }

    return getSubmissionStatus({ submissionId, anonymized: false });
  }
};

export default castVote;
