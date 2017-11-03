import React from 'react';

import Team from './Team';

export default {
  path: '/team',

  async action() {
    return {
      title: 'Team - Community Fund',
      component: <Team />,
    };
  },
};
