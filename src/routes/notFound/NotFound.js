import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NotFound.scss';

class NotFound extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h1>404 - Page not found</h1>
        <img
          src="/img/404.gif"
          alt="notfound"
          style={{ height: '60vh', maxHeight: '300px' }}
        />
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
