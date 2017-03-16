import React from 'react';

import GrantForm from './GrantForm';
import GrantFormSuccess from './GrantFormSuccess';

export default [
  {
    path: '/grant',

    async action() {
      return {
        title: 'Apply for a grant',
        component: <GrantForm />,
      };
    },
  },
  {
    path: '/grant/success',

    async action() {
      return {
        title: 'Success',
        component: <GrantFormSuccess />,
      };
    },
  },
];
