/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '',
      load: () => import(/* webpackChunkName: 'frontpage' */ './frontpage'),
    },
    {
      path: '/guidelines',
      load: () =>
        import(/* webpackChunkName: 'guidelines' */ './content-pages/Guidelines'),
    },
    {
      path: '/team',
      load: () => import(/* webpackChunkName: 'team' */ './team'),
    },
    {
      path: '/people',
      load: () => import(/* webpackChunkName: 'people' */ './people'),
    },
    {
      path: '/login',
      load: () => import(/* webpackChunkName: 'login' */ './login'),
    },
    {
      path: '/signup',
      load: () => import(/* webpackChunkName: 'signup' */ './signup'),
    },
    {
      path: '/grant',
      children: require('./grantform').default,
    },
    {
      path: '/submission',
      children: require('./submission').default,
    },
    {
      path: '/home',
      children: require('./home').default,
    },
    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => import(/* webpackChunkName: 'not-found' */ './notFound'),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    route.title = route.title || 'Community Fund';
    route.description =
      route.description ||
      'Community Fund support the Icelandic tech community by easing the access to capital for events.';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;
