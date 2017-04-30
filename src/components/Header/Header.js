import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';

class Header extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <Link to="/">
          <img
            className={s.logo}
            src="/logos/transparent_logo.png"
            alt="logo"
          />
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(Header);
