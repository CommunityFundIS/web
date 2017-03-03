import React from 'react';

import Frontpage from './Frontpage';

export default {
  path: '/',

  async action() {
    return {
      title: 'Community Fund',
      component: <Frontpage />,
    };
  },
};
