import React from 'react';

export default () => {
  const ContentPage = import('./ContentPage');
  const content = import('./guidelines.md');

  return {
    chunks: ['guidelines'],
    title: 'Guidelines - Community Fund',
    component: <ContentPage content={content.html} />,
  };
};
