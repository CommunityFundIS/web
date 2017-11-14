import React from 'react';
import Frontpage from './Frontpage';
import quotes from './quotes';
import { fetchRandomUsers } from '../../actions/users';

export default async ({ store }) => {
  const quote = quotes[new Date().getHours() % quotes.length];

  // Only do this on server side
  // @TODO find a better way, currently we need the blocker to block multiple fetches
  // which results in out of sync server side rendering since the data from users is random
  if (!process.env.BROWSER) {
    await store.dispatch(fetchRandomUsers());
  }

  return {
    chunks: ['frontpage'],
    component: <Frontpage quote={quote} />,
  };
};
