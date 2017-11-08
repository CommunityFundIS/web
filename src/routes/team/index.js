import React from 'react';

export default async () => {
  const Layout = await import('../../components/Layout');
  const Team = await import('./Team');

  return {
    chunks: ['team'],
    title: 'Team - Community Fund',
    component: (
      <Layout.default
        page="team"
        heading="Team"
        description="We are the Community Fund"
        background="/img/background_team.jpg"
      >
        <Team.default />
      </Layout.default>
    ),
  };
};
