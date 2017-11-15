import React from 'react';
import { fetchRandomUsers } from '../../actions/users';

export default async ({ store }) => {
  const Layout = await import('../../components/Layout');
  const People = await import('./People');

  // Only do this on server side
  // @TODO find a better way, currently we need the blocker to block multiple fetches
  // which results in out of sync server side rendering since the data from users is random
  if (!process.env.BROWSER) {
    await store.dispatch(fetchRandomUsers());
  }

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
