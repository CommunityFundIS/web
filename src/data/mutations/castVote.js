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

import { host } from '../../config';

import operatorStatusTemplate from '../emailTemplates/operatorStatus.handlebars';

import sendEmail from '../../core/email';

const sendEmailToOperator = async (operator, submission, status) => {
  log(
    'Sending submission status email to operator',
    operator.email,
    submission.id,
    status
  );

  const url = `https://${host}/submission/${submission.id}`;

  const html = operatorStatusTemplate({
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    askAmount: submission.askAmount,
    totalCost: submission.totalCost,
    status,
    url
  });

  return sendEmail(
    operator.email,
    'Community Fund - Application Reviewed',
    html
  );
};

const sendEmailToOperators = async (submissionId, status) => {
  const operators = await User.findAll({
    where: {
      isOperator: true
    }
  });
  const submission = await Submission.findOne({
    where: {
      id: submissionId
    }
  });

  return Promise.all(
    operators.map(operator => sendEmailToOperator(operator, submission), status)
  );
};

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

      const submission = Submission.findOne({
        where: {
          id: submissionId
        }
      });

      const alreadyHasResults = submission.result;

      // There is a race condition here that could result in two emails sent.
      // Highly unlikely unless everyone votes at the same time

      const resultSoFar = await submissionResult(submissionId);
      log('Result so far', resultSoFar);

      if (!alreadyHasResults && resultSoFar !== 'pending') {
        log('The votes are in!');
        await Submission.update(
          { decidedOn: moment(), result: resultSoFar },
          { where: { id: submissionId } }
        );

        // Send email to operators
        await sendEmailToOperators(submissionId, resultSoFar);
      }

      return getSubmissionStatus({ submissionId, anonymized: false });
    } catch (e) {
      logError(e);
      throw e;
    }
  }
};

export default castVote;
