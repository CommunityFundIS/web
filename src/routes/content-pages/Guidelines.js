import React from 'react';

export default () => {
  const ContentPage = require('./ContentPage');
  const content = require('./guidelines.md');

  return {
    chunks: ['guidelines'],
    title: 'Guidelines - Community Fund',
    component: <ContentPage content={content.html} />,
  };
};
