import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Parallax } from 'react-parallax';
import Link from '../../components/Link';

import s from './Frontpage.css';

class Frontpage extends Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.firstContainer}>
          <div className={s.wrapper}>
            <img className={s.logo} src="/img/tcf.png" alt="logo" />
            <div className={s.headline}>PLANNING A COMMUNITY EVENT?</div>
            <div className={s.slogan}>
              We enable community builders by helping out with the money.
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
            <div className={s.testimonyContainer}>
              <div className={s.clientBox}>
                <div className={s.clientInfo}>
                  <div className={s.clientName}>TEMPO</div>
                  <div className={s.clientTitle}>Founding Partner</div>
                  <div className={s.clientText}>
                    Tempo is an Icelandic company that builds productivity software
                  </div>
                </div>
              </div>
              <div className={s.clientImageContainer}>
                <img className={s.clientImage} src="/img/tempo.png" alt="tempo" />
              </div>

            </div>
            <div className={s.testimonyContainer}>
              <div className={s.clientBox}>
                <div className={s.clientInfo}>
                  <div className={s.clientName}>BERINGER FINANCE</div>
                  <div className={s.clientTitle}>Founding Partner</div>
                  <div className={s.clientText}>
                    Beringer Finance is the biggest investment bank focused on tech in the Nordics
                  </div>
                </div>
              </div>
              <div className={s.clientImageContainer}>
                <img className={s.clientImage} src="/img/beringer.png" alt="beringer" />
              </div>

            </div>
            <div className={s.calculatorContainer}>
              <div className={`${s.calculatorText} ${s.calculatorTextUpper}`}>
                We hand out up to&nbsp;
                <div className={s.calculatorCost}>200.000kr.</div>
                &nbsp;in grants per month
              </div>
              <Link className={`${s.applyButton} ${s.calculatorTryButton}`} to="/grants">
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
                <a className={s.footerItemInner} href="https://grassroots.com/Press.zip">
                  <img className={s.pressIcon} src="/img/press@2x.png" alt="press" />
                  Press
                </a>
              </div>
              <div className={s.footerItemWrapper}>
                <a className={s.footerItemInner} href="mailto:david@watchboxapp.com">
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
              © Grassroots Fund&nbsp;{new Date().getFullYear()}&nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Frontpage);
