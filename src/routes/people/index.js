import React from 'react';
import { fetchUsers } from '../../actions/users';

export default async ({ store }) => {
  const Layout = await import('../../components/Layout');
  const People = await import('./People');

  await store.dispatch(fetchUsers({ count: 500 }));

  return {
    chunks: ['people'],
    title: 'People - Community Fund',
    component: (
      <Layout.default
        page="people"
        heading="People"
        description="We are the tech community in Iceland"
        background="/img/background_people.jpg"
      >
        <People.default />
      </Layout.default>
    ),
  };
};
