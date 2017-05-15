import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import { ensureLoggedIn } from 'connect-ensure-login';
import { log, logError } from './logger';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import schema from './data/schema';
import routes from './routes';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { port, auth } from './config';

import models from './data/models';

const app = express();

const COOKIE_TOKEN_NAME = 'id_token';

const expiresIn = 60 * 60 * 24 * 15; // 15 days
const token = jwt.sign(
  {
    id: 'c0fd1b80-38a2-11e7-aee3-47d0f02db34b',
    isReviewer: true
  },
  auth.jwt.secret,
  { expiresIn }
);

console.log('signed', token);
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const token = req.query && req.query.token;

  // Always override if we have token
  if (token) {
    req.cookies[COOKIE_TOKEN_NAME] = token;
    res.cookie(COOKIE_TOKEN_NAME, token, {
      maxAge: 1000 * 15 * 60,
      httpOnly: true
    });
  }
  next();
});

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies[COOKIE_TOKEN_NAME]
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy');
}

//
// Frontend routes and auth redirects
// -----------------------------------------------------------------------------
app.get('/login', (req, res, next) => {
  const isLoggedIn = req.isAuthenticated && req.isAuthenticated();
  if (isLoggedIn) {
    return res.redirect('/');
  }
  return next();
});

app.get('/', (req, res, next) => next());

app.post('/login/username', (req, res, next) => {
  passport.authenticate('local', (err, user /* ,info */) => {
    if (err) {
      if (err.type === 'invalidPassword') {
        return res.redirect('/login?error=noMatch2');
      }

      return res.redirect('/login?error=general');
    }
    if (!user) {
      return res.redirect('/login?error=noMatch');
    }

    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
    res.cookie(COOKIE_TOKEN_NAME, token, {
      maxAge: 1000 * expiresIn,
      httpOnly: true
    });
    return res.redirect('/');
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  res.clearCookie(COOKIE_TOKEN_NAME);
  req.logout();
  res.redirect('/');
});

app.get('/profile', ensureLoggedIn(), (req, res) => {
  log('in /profile');
  res.json(req.user);
});

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => {
    if (!req.user && req.body.token) {
      try {
        const { id } = jwt.decode(req.body.token);
        req.user = { id }; // eslint-disable-line no-param-reassign
      } catch (err) {
        logError(err);
      }
    }
    return {
      schema,
      graphiql: process.env.NODE_ENV !== 'production',
      rootValue: { req },
      pretty: process.env.NODE_ENV !== 'production'
    };
  })
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const store = configureStore(
      {
        user: req.user
      },
      {
        cookie: req.headers.cookie
      }
    );

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now()
      })
    );

    const css = new Set();

    const expiresIn = 60; // 60 seconds

    let token;

    if (req.user) {
      token = jwt.sign(
        {
          id: req.user.id,
          isReviewer: req.user.isReviewer
        },
        auth.jwt.secret,
        { expiresIn }
      );
    }

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      token,
      userAgent: req.headers['user-agent'],
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>{route.component}</App>
    );
    data.style = [...css].join('');
    data.scripts = [assets.vendor.js, assets.client.js];
    data.state = context.store.getState();
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

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

app.use((err, req, res) => {
  // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      style={errorPageStyle._getCss()} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
models.sync().catch(err => logError(err.stack)).then(() => {
  app.listen(port, () => {
    log(`The server is running at http://localhost:${port}/`);
  });
});
