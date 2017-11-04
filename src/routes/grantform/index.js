import React from 'react';

import GrantForm from './GrantForm';
import GrantFormSuccess from './GrantFormSuccess';

export default [
  {
    path: '',
    action() {
      return {
        title: 'Apply for a grant',
        component: <GrantForm />,
      };
    },
  },
  {
    path: '/success',
    action({ store }) {
      const { grant: { submission } } = store.getState();

      if (!submission) {
        return { redirect: '/' };
      }

      return {
        title: 'Success',
        component: <GrantFormSuccess />,
      };
    },
  },
];
