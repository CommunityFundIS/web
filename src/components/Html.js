/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

const lastUpdate = new Date();

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    style: PropTypes.string,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    children: PropTypes.string
  };

  render() {
    const { title, style, scripts, state, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1,minimal-ui"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Community Fund support the Icelandic tech community by easing the access to capital for events."
          />
          <meta
            name="keywords"
            content="community, grants, community fund, iceland, tech, developers"
          />
          <meta property="og:title" content="Community Fund" />
          <meta property="og:site_name" content="communityfund.co" />
          <meta property="og:url" content="https://communityfund.co" />
          <meta
            property="og:description"
            content="Community Fund support the Icelandic tech community by easing the access to capital for events."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://communityfund.co/img/og_large.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Community Fund" />
          <meta
            name="twitter:description"
            content="Community Fund support the Icelandic tech community by easing the access to capital for events."
          />
          <meta
            name="twitter:image"
            content="https://communityfund.co/img/og_large.png"
          />
          {style &&
            <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
        </head>
        <body>
          <div
            dangerouslySetInnerHTML={{
              __html: `<!-- Last update: ${lastUpdate} -->`
            }}
            style={{ display: 'none' }}
          />
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {state &&
            <script
              dangerouslySetInnerHTML={{
                __html: `window.APP_STATE=${serialize(state, { isJSON: true })}`
              }}
            />}
          {scripts &&
            scripts.map(script => <script key={script} src={script} />)}
          {analytics.google.trackingId &&
            <script
              dangerouslySetInnerHTML={{
                __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`
              }}
            />}
          {analytics.google.trackingId &&
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />}

          <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: "WebFont.load({ google: { families: ['Lato:300,400,600,700'] }});"
            }}
          />
        </body>
      </html>
    );
  }
}

export default Html;
