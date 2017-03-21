/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

const dbObj = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export const db = dbObj;

export const isDev = process.env.NODE_ENV === 'development';

export const googleRecaptchaSecret = process.env.GOOGLE_RECAPTCHA_SECRET;

export const AWS_SES = {
  user: process.env.AWS_SES_USER,
  password: process.env.AWS_SES_PASSWORD,
};

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },
};

export const auth = {
  jwt: { secret: process.env.JWT_SECRET },
};
