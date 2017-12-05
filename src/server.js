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
import axios from 'axios';
import cors from 'cors';

import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models, { User, Attending } from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';
import { getUploadUrl } from './lib/s3';
import sendEmail from './lib/email';
import createHelpers from './store/createHelpers';

import signupTemplate from './data/emailTemplates/signup.handlebars';
import resetTemplate from './data/emailTemplates/reset.handlebars';

const app = express();

const COOKIE_TOKEN_NAME = 'id_token';

const cookieExpiration = 60 * 60 * 24 * 365; // One year
const createLoginSession = (req, res, userId) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    config.auth.jwt.secret,
    { expiresIn: cookieExpiration },
  );

  req.cookies[COOKIE_TOKEN_NAME] = token;
  res.cookie(COOKIE_TOKEN_NAME, token, {
    maxAge: cookieExpiration * 1000, // One year
    httpOnly: true,
  });
};

const isValidToken = async googleToken => {
  const { data } = await axios(
    `https://www.google.com/recaptcha/api/siteverify?secret=${config.googleRecaptchaInvisibleSecret}&response=${googleToken}`,
  );

  return !!data.success;
};

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(cors(), express.static(path.resolve(__dirname, 'public')));
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
      maxAge: cookieExpiration,
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

//
// API Endpoints
// -----------------------------------------------------------------------------
app.post('/api/upload-url', async (req, res, next) => {
  if (!req.user) return res.json({ error: 'Not authenticated' });

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

app.post('/api/login', async (req, res) => {
  try {
    const { email, password, andAttend } = req.body;

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
      return res.json({
        success: false,
        error: 'User/Password combination does not exist',
      });
    }

    if (!user.comparePassword(password)) {
      // Password mismatch
      return res.json({
        success: false,
        error: 'User/Password combination does not exist',
      });
    }

    if (andAttend) {
      // Attend with signup
      await Attending.upsert({
        eventId: andAttend,
        userId: user.id,
        status: 1,
      });
    }

    createLoginSession(req, res, user.id);
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      error: 'Something went wrong',
    });
  }

  return res.json({
    success: true,
  });
});

app.post('/api/reset', async (req, res) => {
  const { email, googleToken } = req.body;

  if (!email) {
    return res.json({ error: 'Email is required' });
  }

  // Verify the google verification
  if (!await isValidToken(googleToken)) {
    return res.json({ success: false, error: 'You are not human' });
  }

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.json({ error: 'User not found' });
  }

  user.set('resetToken', uuid.v4());

  await user.save();

  const html = resetTemplate({
    url: `https://communityfund.is/reset/${user.id}/${user.resetToken}`,
  });

  await sendEmail(user.email, 'Reset your password on Community Fund', html);

  return res.json({
    success: true,
  });
});

app.post('/api/reset/:userId/:token', async (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    where: {
      id: userId,
      resetToken: token,
    },
  });

  if (!user) {
    return res.json({ error: 'Username/Token combination is not valid' });
  }

  user.set('resetToken', null);
  user.set('password', User.generateHash(password));

  await user.save();

  return res.json({
    success: true,
  });
});

app.post('/api/reset/:userId/:token/is-valid', async (req, res) => {
  const { userId, token } = req.params;

  const user = await User.findOne({
    where: {
      id: userId,
      resetToken: token,
    },
  });

  if (!user) return res.json({ isValid: false });

  return res.json({ isValid: true });
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const { email, googleToken, andAttend } = req.body;

    if (!email) {
      return res.json({ success: false, error: 'Email is required' });
    }

    // Verify the google verification
    if (!await isValidToken(googleToken)) {
      return res.json({ success: false, error: 'You are not human' });
    }

    const hasUser = await User.findOne({ where: { email } });

    if (hasUser) {
      return res.json({ success: false, error: 'User already exists' });
    }

    const user = await User.create({
      email,
      password: User.generateHash(uuid.v4() + uuid.v4() + uuid.v4()),
      name: '',
      image: null,
      title: null,
      resetToken: null,
      verificationToken: uuid.v4(),
    });

    if (andAttend) {
      // Attend with signup
      await Attending.upsert({
        eventId: andAttend,
        userId: user.id,
        status: 1,
      });
    }

    // Send email to user
    log(`Sending signup email to ${user.email}`);

    const html = signupTemplate({
      url: `https://communityfund.is/signup/confirm/${user.id}/${user.verificationToken}`,
    });

    await sendEmail(user.email, 'Confirm your account on Community Fund', html);
  } catch (e) {
    next(e);
  }

  return res.json({
    success: true,
  });
});

//
// Other non API Endpoints
// -----------------------------------------------------------------------------

// Confirm link via email
app.get('/signup/confirm/:userId/:token', async (req, res) => {
  const { userId, token } = req.params;

  const user = await User.findOne({
    where: {
      id: userId,
      verificationToken: token,
    },
  });

  if (!user) return res.redirect('/signup?redirect=error-verification');

  createLoginSession(req, res, user.id);

  // Verify user and remove token
  user.set('verified', true);
  user.set('verificationToken', null);

  await user.save();

  // Redirect to home page
  return res.redirect('/home');
});

app.get('/logout', (req, res) => {
  req.cookies[COOKIE_TOKEN_NAME] = undefined;
  res.clearCookie(COOKIE_TOKEN_NAME);

  res.redirect('/');
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

    const { graphqlRequest } = createHelpers({ fetch });

    const store = configureStore(initialState, {
      fetch,
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
      graphqlRequest,
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
