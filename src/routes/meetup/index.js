import React from 'react';

export default [
  {
    // Group
    path: '/:groupId',
    async action() {
      const SingleGroup = await import('./SingleGroup');

      return {
        title: 'Single Group - Community Fund',
        component: <SingleGroup.default />,
      };
    },
  },
  {
    // Event
    path: '/:groupId/:eventId',
    async action() {
      const SingleEvent = await import('./SingleEvent');

      return {
        title: 'Single Event - Community Fund',
        component: <SingleEvent.default />,
      };
    },
  },
];
