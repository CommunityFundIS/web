/* eslint-disable global-require */

const flatten = arrayOfArrays => [].concat([], ...arrayOfArrays);

const joinRoutes = routes => flatten(
    routes.map(route => {
      if (!Array.isArray(route)) {
        return [route];
      }

      return route;
    }),
  );

// The top-level (parent) route
export default {
  path: '/',

  // Keep in mind, routes are evaluated in order
  children: joinRoutes([
    require('./frontpage').default,
    require('./grantform').default,
    require('./login').default,
    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ]),

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};
