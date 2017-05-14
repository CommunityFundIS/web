import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Parallax } from 'react-parallax';
import cx from 'classnames';

import Link from '../../components/Link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { partners, sponsors, supporters } from './backers.js';

import rvkImage from '../../../public/img/rvk3.png';
import s from './Frontpage.css';

const Company = ({ name, url, logo, description }, index) => (
  <div key={index} className={s.backerContainer}>
    <div className={s.backerImageContainer}>
      <a
        href={url}
        className={s.backerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={s.backerImage} src={logo} alt={name} />
      </a>
    </div>
    <div className={s.backerBox}>
      <div className={s.backerText}>{description}</div>
    </div>
  </div>
);

Company.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  logo: PropTypes.string,
  description: PropTypes.string
};

class Frontpage extends Component {
  constructor(props) {
    super(props);

    // @TODO move this to redux
    this.state = {
      email: ''
    };

    this.emailChange = this.emailChange.bind(this);
  }
  emailChange(email) {
    this.setState({ email });
  }
  render() {
    const { email } = this.state;
    return (
      <div className={s.container}>
        <div className={s.firstContainer}>
          <div className={s.headerImageOverlay} />
          <div className={cx(s.wrapper, s.firstWrapper)}>
            <Header />
            <div style={{ flex: 0.5 }} />
            <div style={{ zIndex: 10 }}>
              <div className={s.headline}>PLANNING A COMMUNITY EVENT?</div>
              <div className={s.slogan}>
                We support the Icelandic tech community by easing the access to capital for events.
              </div>
            </div>
            <Link
              className={s.applyButton}
              style={{ marginTop: '40px', marginBottom: '40px' }}
              to="/grant"
            >
              Apply for a grant
            </Link>
          </div>
        </div>
        <div className={s.secondContainer}>
          <div className={cx(s.wrapper, s.secondWrapper)}>
            <div>
              <p>
                The Community Fund helps community builders plan events around their passion.
              </p>
              <p>
                We
                {"'"}
                re here to enable the tech and startup community grow closer and better,
                by making events, meetups, and other initiatives easier to execute.
              </p>
              <p>
                Our partners provide funding, experience,
                and connections to make your event a complete success.
              </p>

              <h3 className={s.newsletterHeading}>
                Subscribe to our newsletter
              </h3>
              <form
                action="//communityfund.us14.list-manage.com/subscribe/post?u=60fd5c50c834ceb92626f21d8&amp;id=62b8379d4e"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                target="_blank"
                className={s.newsletterContainer}
              >
                <input
                  type="email"
                  value={email}
                  name="EMAIL"
                  id="mce-EMAIL"
                  placeholder="Email address"
                  className={s.input}
                  required
                  onChange={e => this.emailChange(e.target.value)}
                />
                <input
                  type="submit"
                  value="Subscribe"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className={s.subscribe}
                />
              </form>
            </div>
            <img
              className={s.hands}
              src="/img/community_hands.png"
              alt="hands"
            />
          </div>
        </div>
        <div className={s.thirdContainer}>
          <Parallax bgImage={rvkImage} strength={140} className={s.parallax}>
            <div className={s.parallaxContainer}>
              <div className={s.parallaxImageOverlay} />
              <h1 style={{ zIndex: '10' }}>
                HERE ARE OUR AWESOME PARTNERS
              </h1>
            </div>
          </Parallax>
        </div>
        <div className={s.fourthContainer}>
          <div className={s.wrapper}>
            <h1 className={s.backerCategory} style={{ marginTop: '30px' }}>
              Financial Partners
            </h1>
            {partners.map(Company)}

            <h1 className={s.backerCategory}>Sponsors</h1>
            <div>
              {sponsors.map(Company)}
            </div>

            <h1 className={s.backerCategory}>Supporters</h1>
            {supporters.map(Company)}

            <div className={s.handoutContainer}>
              <p>
                We hand out up to&nbsp;
                <span className={s.handoutAmount}>200.000 kr.</span>
                &nbsp;in grants per month
              </p>
              <Link
                className={s.applyButton}
                style={{ marginTop: '40px' }}
                to="/grant"
              >
                Apply for a grant
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Frontpage);
