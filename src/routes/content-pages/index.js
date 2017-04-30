import React from 'react';

export default [
  {
    path: '/about',

    async action() {
      const ContentPage = await new Promise(resolve => {
        require.ensure(
          [],
          require => resolve(require('./ContentPage').default),
          'contentPage',
        );
      });

      const content = await new Promise(resolve => {
        require.ensure(
          [],
          require => resolve(require('./about.md')),
          'aboutContent',
        );
      });

      return {
        title: 'About - Community Fund',
        component: <ContentPage content={content.html} />,
      };
    },
  },
  {
    path: '/guidelines',

    async action() {
      const ContentPage = await new Promise(resolve => {
        require.ensure(
          [],
          require => resolve(require('./ContentPage').default),
          'contentPage',
        );
      });

      const content = await new Promise(resolve => {
        require.ensure(
          [],
          require => resolve(require('./guidelines.md')),
          'guidelinesContent',
        );
      });

      return {
        title: 'Guidelines - Community Fund',
        component: <ContentPage content={content.html} />,
      };
    },
  },
];
