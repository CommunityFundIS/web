import React from 'react';

export default async () => {
  const Layout = await import('../../components/Layout');
  const ContentPage = await import('./ContentPage');
  const content = await import('./about.md');

  return {
    chunks: ['about'],
    title: 'About - Community Fund',
    component: (
      <Layout.default>
        <ContentPage.default content={content.html} />
      </Layout.default>
    ),
  };
};
