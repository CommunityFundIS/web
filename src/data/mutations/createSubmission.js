import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import SubmissionType from '../types/SubmissionType';
import { Submission, User } from '../models';
import { log, logError } from '../../logger';
import config from '../../config';
import reviewTemplate from '../emailTemplates/review.handlebars';
import applicantTemplate from '../emailTemplates/applicant.handlebars';
import newApplicationCFTemplate from '../emailTemplates/newApplicationCF.handlebars';
import sendEmail from '../../lib/email';

export const sendEmailToCF = async submission => {
  log('Sending grant mail to hello@communityfund.co');

  const html = newApplicationCFTemplate({
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    askAmount: submission.askAmount,
    totalCost: submission.totalCost,
    url: `https://${config.host}/submission/${submission.id}`,
  });

  return sendEmail('hello@communityfund.co', 'New grant application', html);
};

export const sendEmailToReviewer = async (reviewer, submission) => {
  log('Sending grant review email', reviewer.email, submission.id);

  const expiresIn = 60 * 60 * 24 * 30; // 30 days
  const token = jwt.sign(
    {
      id: reviewer.id,
      isReviewer: reviewer.isReviewer,
    },
    config.auth.jwt.secret,
    { expiresIn },
  );

  const reviewUrl = `https://${config.host}/submission/${submission.id}?token=${token}`;
  log(reviewUrl);

  const html = reviewTemplate({
    id: submission.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email,
    askAmount: submission.askAmount,
    totalCost: submission.totalCost,
    reviewUrl,
  });

  return sendEmail(reviewer.email, 'New grant application', html);
};

export const sendEmailToApplicant = async (email, name, submission) => {
  log('Sending applicant email', email, submission.id);

  const applicantUrl = `https://${config.host}/submission/${submission.id}`;
  log(applicantUrl);

  const html = applicantTemplate({
    name,
    applicantUrl,
  });

  return sendEmail(email, 'Your grant application', html);
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
    { req, fetch },
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
    },
  ) => {
    // Only validate with recaptcha if we are on prod. To Pass the authentication
    // the googleRecaptchaSecret needs to be passed into the process.
    if (!__DEV__) {
      const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.googleRecaptchaSecret}&response=${googleToken}&remoteip=${req.ip}`;

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
        result: 'pending',
      });
    } catch (e) {
      logError(e);
      // @TODO handle better
      throw e;
    }

    const reviewers = await User.findAll({
      where: {
        isReviewer: true,
      },
    });

    reviewers.map(reviewer => sendEmailToReviewer(reviewer, submission));

    const firstName = (name || '').split(' ')[0];

    await Promise.all([
      sendEmailToApplicant(email, firstName, submission),
      !__DEV__ ? sendEmailToCF(submission) : Promise.resolve(),
    ]);

    return submission;
  },
};

export default createSubmission;
