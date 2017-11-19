import React from 'react';

export default [
  {
    // Create group
    path: '/create',
    async action() {
      const CreateGroup = await import('./CreateGroup');

      return {
        title: 'Create Event',
        component: <CreateGroup.default />,
      };
    },
  },
  {
    // Create event
    path: '/:groupId/create',
    async action() {
      const CreateEvent = await import('./CreateEvent');

      return {
        title: 'Create Event',
        component: <CreateEvent.default />,
      };
    },
  },
  {
    // Group
    path: '/:groupId',
    async action() {
      const SingleGroup = await import('./SingleGroup');

      return {
        title: 'Single Group',
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
        title: 'Single Event',
        component: <SingleEvent.default />,
      };
    },
  },
];
