import React from 'react';

export default () => {
  const ContentPage = require('./ContentPage');
  const content = require('./about.md');

  return {
    chunks: ['about'],
    title: 'About - Community Fund',
    component: <ContentPage content={content.html} />,
  };
};
