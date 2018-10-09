import React from 'react';
import Frontpage from './Frontpage';
import quotes from './quotes';
import { fetchUsers } from '../../actions/users';

export default async ({ store }) => {
  const quote = quotes[new Date().getHours() % quotes.length];

  // Only do this on server side
  // @TODO find a better way, currently we need the blocker to block multiple fetches
  // which results in out of sync server side rendering since the data from users is random
  if (!process.env.BROWSER) {
    await store.dispatch(fetchUsers({ random: true, onlyWithName: true }));
  }

  return {
    chunks: ['frontpage'],
    component: <Frontpage quote={quote} />,
  };
};
