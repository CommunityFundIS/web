import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  render() {
    return (
      <div className={s.footer}>
        <div className={s.items}>
          <div style={{ flex: 8 }} />
          <div className={s.item}>
            <a className={s.itemInner} href="mailto:hello@communityfund.co">
              <img
                className={s.contactIcon}
                src="/img/contact@2x.png"
                alt="Contact"
              />
              Contact Us
            </a>
          </div>
          <div className={s.item}>
            <Link to="/team" className={s.itemInner}>
              <img className={s.teamIcon} src="/img/team@2x.png" alt="Team" />
              The Team
            </Link>
          </div>
          <div className={s.item}>
            <Link to="/guidelines" className={s.itemInner}>
              <img
                className={s.guidelinesIcon}
                src="/img/guidelines.png"
                alt="Guidelines"
              />
              Guidelines
            </Link>
          </div>
          {/* <div className={s.item}>
            <Link to="/about" className={s.itemInner}>
              <img className={s.teamIcon} src="/img/press@2x.png" alt="about" />
              About
            </Link>
          </div> */}
          <div style={{ flex: 8 }} />
        </div>
        <div className={s.copyright}>
          © Community Fund&nbsp;{new Date().getFullYear()}&nbsp;
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
