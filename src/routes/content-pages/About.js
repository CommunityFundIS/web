import React from 'react';

export default () => {
  const ContentPage = import('./ContentPage');
  const content = import('./about.md');

  return {
    chunks: ['about'],
    title: 'About - Community Fund',
    component: <ContentPage content={content.html} />,
  };
};
