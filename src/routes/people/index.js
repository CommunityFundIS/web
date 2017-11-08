import React from 'react';

export default async () => {
  const Layout = await import('../../components/Layout');
  const People = await import('./People');

  return {
    chunks: ['people'],
    title: 'People - Community Fund',
    component: (
      <Layout.default
        page="people"
        heading="People"
        description="We are the tech community in Iceland"
        background="/img/background_people.jpg"
      >
        <People.default />
      </Layout.default>
    ),
  };
};
