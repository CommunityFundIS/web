import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import s from './Team.css';

class Team extends Component {
  render() {
    return (
      <div className={s.container}>
        <Header />
        <div className={s.content}>
          <div className={s.person}>
            <img
              src="/img/team/kiddi_kassi.png"
              alt="Kristinn Árni Lár Hróbjartsson"
            />
            <h2>Kristinn Árni Lár Hróbjartsson  - Operator</h2>
          </div>
          <div className={s.person}>
            <img
              src="/img/team/kristjanmik.jpg"
              alt="Kristján Ingi Mikaelsson"
            />
            <h2>Kristján Ingi Mikaelsson - Operator</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Team);
