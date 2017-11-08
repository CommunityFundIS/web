import React from 'react';

import Frontpage from './Frontpage';

import quotes from './quotes';

export default () => {
  const quote = quotes[new Date().getHours() % quotes.length];

  return {
    chunks: ['frontpage'],
    component: <Frontpage quote={quote} />,
  };
};
