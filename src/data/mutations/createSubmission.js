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
import reviewTemplate from '../emailTemplates/review.handlebars';
import sendEmail from '../../core/email';

export const sendEmailToReviewer = async (reviewerEmail, submissionId) => {
  console.log('Sending grant review email', reviewerEmail, submissionId);

  const submission = await Submission.findOne({
    id: submissionId,
  });

  if (!submission) {
    throw Error('Submission not found');
  }

  // TODO: We need to read this dynamically
  const hostName = 'http://communityfund.co';

  const html = reviewTemplate({
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    askAmount: submission.askAmount,
    totalCost: submission.totalCost,
    reviewUrl: `${hostName}/submission/${submission.id}`,
  });

  sendEmail(reviewerEmail, 'New grant application', html);
};

const createSubmission = {
  type: SubmissionType,
  args: {
    name: { type: new NonNull(StringType) },
    email: { type: new NonNull(StringType) },
    phone: { type: new NonNull(StringType) },
    date: { type: new NonNull(StringType) },
    summary: { type: new NonNull(StringType) },
    description: { type: new NonNull(StringType) },
    askAmount: { type: new NonNull(StringType) },
    totalCost: { type: new NonNull(StringType) },
    googleToken: { type: new NonNull(StringType) },
  },
  resolve: async (
    { req },
    {
      name,
      email,
      phone,
      date,
      summary,
      description,
      askAmount,
      totalCost,
      googleToken,
    }
  ) => {
    // Only validate with recaptcha if we are on prod. To Pass the authentication
    // the googleRecaptchaSecret needs to be passed into the process.
    if (!isDev) {
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${googleRecaptchaSecret}&response=${googleToken}&remoteip=${req.ip}`;

      const request = await fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (request.status !== 200) {
        // @TODO handle better
        throw Error('Wrong status in auth');
      }

      const data = await request.json();

      if (!data.success) {
        // @TODO handle better
        throw Error('No success in auth');
      }
    }

    let submission;

    try {
      submission = await Submission.create({
        name,
        email,
        phone,
        date: moment(date, 'DD/MM/YYYY').format(),
        summary,
        description,
        askAmount,
        totalCost,
      });
    } catch (e) {
      logError(e);
      // @TODO handle better
      throw e;
    }

    // TODO: Send email to applicant

    const reviewers = await User.findAll({
      isReviewer: true,
    });

    // Send review email to all reviewers
    await Promise.all(
      reviewers.map(user => sendEmailToReviewer(user.email, submission.id))
    );

    return submission;
  },
};

export default createSubmission;
