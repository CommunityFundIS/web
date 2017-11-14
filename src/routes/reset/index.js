import React from 'react';
import ResetOne from './ResetOne';
import ResetTwo from './ResetTwo';
import SemanticUI from '../../components/SemanticUI';

export default [
  {
    path: '',
    action({ query }) {
      const { redirect } = query;
      return {
        component: (
          <SemanticUI>
            <ResetOne redirect={redirect} />
          </SemanticUI>
        ),
      };
    },
  },
  {
    path: '/:userId/:token',
    async action({ fetch, params }) {
      const { userId, token } = params;

      let data;
      try {
        const request = await fetch(`/api/reset/${userId}/${token}/is-valid`);
        data = await request.json();
      } catch (e) {
        console.error(e);
        return { redirect: '/reset?redirect=error' };
      }

      if (!data.isValid) {
        return { redirect: '/reset?redirect=invalid' };
      }

      return {
        component: (
          <SemanticUI>
            <ResetTwo userId={userId} token={token} />
          </SemanticUI>
        ),
      };
    },
  },
];
