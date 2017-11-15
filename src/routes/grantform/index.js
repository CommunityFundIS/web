import React from 'react';

import GrantFormSuccess from './GrantFormSuccess';

export default [
  {
    path: '',
    async action() {
      const Layout = await import('../../components/Layout');
      const GrantForm = await import('./GrantForm');

      return {
        title: 'Apply for a grant - Community Fund',
        component: (
          <Layout.default
            page="grant"
            heading="Apply for a grant"
            background="/img/background_table.jpg"
          >
            <GrantForm.default />
          </Layout.default>
        ),
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
