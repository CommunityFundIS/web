import React from 'react';
import SubmissionPage from './SubmissionPage';
import { fetchSubmission } from '../../actions/submission';

export default [
  {
    path: '/:id',

    async action({ params, store }) {
      const { id } = params;

      await store.dispatch(fetchSubmission(id));

      const state = store.getState();

      const submission = state.submission[id];
      if (!submission) {
        return { redirect: '/404' };
      }
      return {
        title: `Submission: ${submission.summary}`,
        component: <SubmissionPage submissionId={submission.id} />,
      };
    },
  },
];
