import React from 'react';
import Login from './Login';

const title = 'Log In';

export default {

  path: '/login',

  action() {
    return {
      title,
      component: <Login title={title} />,
    };
  },

};
