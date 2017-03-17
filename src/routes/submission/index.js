import React from 'react';
import SubmissionPage from './SubmissionPage';
import { fetchSubmission } from '../../actions/submission';

export default [
  {
    path: '/submission/:id',

    async action({ params, store }) {
      const submission = await store.dispatch(fetchSubmission(params.id));
      if (!submission) {
        return { redirect: '/' };
      }
      return {
        title: `Submission: ${submission.summary}`,
        component: <SubmissionPage submissionId={submission.id} />,
      };
    },
  },
];
