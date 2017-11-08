import React from 'react';

export default async () => {
  const Layout = await import('../../components/Layout');
  const ContentPage = await import('./ContentPage');
  const content = await import('./guidelines.md');

  return {
    chunks: ['guidelines'],
    title: 'Guidelines - Community Fund',
    component: (
      <Layout.default
        page="guidelines"
        heading="Grant review guidelines"
        description="The following are the guidelines the grant review boards follows to support their decision making."
        background="/img/background_guidelines.jpg"
      >
        <ContentPage.default content={content.html} />
      </Layout.default>
    ),
  };
};
