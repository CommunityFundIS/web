/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { log } from 'logger';
import uuid from 'uuid';
import mime from 'mime';

import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models, { User } from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import { getUploadUrl } from './lib/s3';

const app = express();

const COOKIE_TOKEN_NAME = 'id_token';

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use((req, res, next) => {
  const token = req.query && req.query.token;

  // Always override if we have token
  if (token) {
    req.cookies[COOKIE_TOKEN_NAME] = token;
    res.cookie(COOKIE_TOKEN_NAME, token, {
      maxAge: 60 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }
  next();
});

app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies[COOKIE_TOKEN_NAME],
  }),
);

app.use(async (req, res, next) => {
  if (req.user) {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    if (user) {
      const userObj = { ...user.get({ plain: true }) };
      delete userObj.password;
      delete userObj.updatedAt;

      const topics = await user.getTopics({
        raw: true,
      });

      userObj.topics = topics.map(topic => ({
        id: topic.id,
        name: topic.name,
        color: topic.color,
        order: topic['user_topic.order'], // @TODO use the field correctly
      }));

      req.user = userObj;
    } else {
      // User not found
      delete req.user;
    }
  }

  if (__DEV__) {
    log(
      `\n###LOGGED IN USER###\n${req.user &&
        JSON.stringify(req.user, null, 2)}\n###\n`,
    );
  }

  return next();
});

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
  }
  next(err);
});

app.use(passport.initialize());

if (__DEV__) {
  app.enable('trust proxy');
}

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        success: false,
        error: 'Email is required',
      });
    }

    if (!password) {
      return res.json({
        success: false,
        error: 'Password is required',
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      // No user
      // Should we handle this case with a different message?
      return res.json({
        success: false,
        error: 'User/Password combo does not exist',
      });
    }

    if (!user.comparePassword(password)) {
      // Password mismatch
      return res.json({
        success: false,
        error: 'User/Password combo does not exist',
      });
    }

    const expiresIn = 60 * 60 * 24 * 365; // One year
    const token = jwt.sign(
      {
        id: user.id,
      },
      config.auth.jwt.secret,
      { expiresIn },
    );

    req.cookies[COOKIE_TOKEN_NAME] = token;
    res.cookie(COOKIE_TOKEN_NAME, token, {
      maxAge: 60 * 60 * 24 * 365 * 1000, // One year
      httpOnly: true,
    });
  } catch (e) {
    next(e);
  }

  return res.json({
    success: true,
  });
});

app.post('/api/upload-url', async (req, res, next) => {
  const key = `${uuid.v4()}.png`;
  let url;
  try {
    url = await getUploadUrl(key);
  } catch (e) {
    next(e);
  }

  return res.json({
    url,
    key,
    type: mime.getType(key),
  });
});

//
// Register GraphQL API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: {
      req,
      fetch: createFetch(nodeFetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
      }),
    },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
    });

    const initialState = {
      user: req.user || {},
    };

    const store = configureStore(initialState, {
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      fetch,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      pathname: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500).send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
