import React from 'react';

import GrantForm from './GrantForm';

export default {
  path: '/grant',

  async action() {
    return {
      title: 'Apply for a grant',
      component: <GrantForm />,
    };
  },
};
