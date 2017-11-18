import React from 'react';

export default async () => {
  const Layout = await import('../../components/Layout');
  const Apply = await import('./Apply');

  return {
    chunks: ['apply'],
    title: 'Apply - Community Fund',
    component: (
      <Layout.default
        page="team"
        heading="Apply for a gant"
        description=""
        background="/img/background_table.jpg"
      >
        <Apply.default />
      </Layout.default>
    ),
  };
};
