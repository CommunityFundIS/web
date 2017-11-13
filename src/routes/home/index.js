import React from 'react';
import Home from './Home';
import SemanticUI from '../../components/SemanticUI';
import { fetchTopics } from '../../actions/topics';

export default [
  {
    path: '',
    async action({ store }) {
      const { user } = store.getState();

      if (!user.id) {
        return { redirect: '/login' };
      }

      await store.dispatch(fetchTopics());

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
