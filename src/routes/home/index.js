import React from 'react';
import Home from './Home';
import SemanticUI from '../../components/SemanticUI';

export default [
  {
    path: '',
    async action({ store }) {
      const { user } = store.getState();

      if (!user.id) {
        return { redirect: '/login' };
      }

      return {
        title: `Home - Community Fund`,
        component: (
          <SemanticUI>
            <Home />
          </SemanticUI>
        ),
      };
    },
  },
];
