import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Parallax } from 'react-parallax';
import Link from '../../components/Link';
import { partners, sponsors, supporters } from './backers.js';

import s from './Frontpage.css';

const Company = ({ name, url, logo, description }, index) => (
  <div key={index} className={s.backerContainer}>
    <div className={s.backerImageContainer}>
      <img className={s.backerImage} src={logo} alt={name} />
    </div>
    <div className={s.backerBox}>
      <div className={s.backerInfo}>
        <a href={url} target="_blank" rel="noopener noreferrer" className={s.backerName}>
          {name}
        </a>
        <div className={s.backerText}>{description}</div>
      </div>
    </div>
  </div>
);

Company.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  logo: PropTypes.string,
  description: PropTypes.string,
};

class Frontpage extends Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.firstContainer}>
          <div className={s.wrapper}>
            <img className={s.logo} src="/logos/transparent_logo.png" alt="logo" />
            <div className={s.headline}>PLANNING A COMMUNITY EVENT?</div>
            <div className={s.slogan}>
              We support the community by easing the access to capital for events.
            </div>
            <Link className={s.applyButton} style={{ marginTop: '40px' }} to="/grant">
              Apply for a grant
            </Link>
          </div>
        </div>
        <div className={s.secondContainer}>
          <div className={s.wrapper}>
            <div className={s.showcaseContainer}>
              <div className={s.showcaseLeft}>
                <div className={s.showcaseHeadline}>WHAT IS IT?</div>
                <div className={s.showcaseText}>
                  The Community Fund helps community builders plan events around their passion.
                </div>
                <div className={s.showcaseText}>
                  We
                  {"'"}
                  re here to enable the tech and startup community grow closer and better,
                  by making events, meetups, and other initiatives easier to execute.
                </div>
                <div className={s.showcaseText}>
                  Our partners provide funding, experience,
                  and connections to make your event a complete success.
                </div>
              </div>
              <div className={s.showcaseRight}>
                <img className={s.hands} src="/img/community_hands.png" alt="hands" />
              </div>
            </div>
          </div>
        </div>
        <div className={s.thirdContainer}>
          <Parallax bgImage="img/lyingimg.png" strength={200} className={s.parallax}>
            <div className={s.testemonyContainer}>
              <div className={s.testimonyHeadline}>
                WE COULDN{"'"}T DO THIS WITHOUT OUR PARTNERS
              </div>
            </div>
          </Parallax>
        </div>
        <div className={s.fourthContainer}>
          <div className={s.wrapper}>
            <h1 className={s.backerCategory}>Financial Partners</h1>
            {partners.map(Company)}

            <h1 className={s.backerCategory}>Sponsors</h1>
            {sponsors.map(Company)}

            <h1 className={s.backerCategory}>Supporters</h1>
            {supporters.map(Company)}

            <div className={s.calculatorContainer}>
              <div className={`${s.calculatorText} ${s.calculatorTextUpper}`}>
                We hand out up to&nbsp;
                <div className={s.calculatorCost}>200.000kr.</div>
                &nbsp;in grants per month
              </div>
              <Link className={`${s.applyButton} ${s.calculatorTryButton}`} to="/grant">
                Apply for a grant
              </Link>
            </div>
          </div>
        </div>
        <div className={s.footerBreaker} />
        <div className={s.footer}>
          <div className={`${s.wrapper} ${s.footerWrapper}`}>
            <div className={s.footerItems}>

              <div style={{ flex: 8 }} />
              <div className={s.footerItemWrapper}>
                <a className={s.footerItemInner} href="mailto:hello@communityfund.co">
                  <img className={s.contactIcon} src="/img/contact@2x.png" alt="contact" />
                  Contact Us
                </a>
              </div>
              <div className={s.footerItemWrapper}>
                <div className={s.footerItemInner}>
                  <img className={s.teamIcon} src="/img/team@2x.png" alt="team" />
                  The Team
                </div>
              </div>

              <div style={{ flex: 8 }} />
            </div>
            <div className={s.copyright}>
              © Community Fund&nbsp;{new Date().getFullYear()}&nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Frontpage);
