import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Team.scss';

class Team extends Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.personCategory}>Grant review board</div>
        <div className={s.people}>
          <div className={s.person}>
            <img src="/img/team/arndis.png" alt="Arndís Ósk Jónsdóttir" />
            <h2>Arndís Ósk Jónsdóttir</h2>
            <h2>Tempo</h2>
          </div>
          <div className={s.person}>
            <img src="/img/team/gudbjorg.jpg" alt="Guðbjörg Rist Jónsdóttir" />
            <h2>Guðbjörg Rist Jónsdóttir</h2>
            <h2>Northstack</h2>
          </div>
          <div className={s.person}>
            <img
              src="/img/team/hjalli.jpg"
              alt="Kristinn Árni Lár Hróbjartsson"
            />
            <h2>Hjálmar Gíslason</h2>
            <h2>Investa</h2>
          </div>
          <div className={s.person}>
            <img
              src="/img/team/kristjanmik.jpg"
              alt="Kristján Ingi Mikaelsson"
            />
            <h2>Kristján Ingi Mikaelsson</h2>
            <h2>Community Fund</h2>
          </div>
          <div className={s.person}>
            <img src="/img/team/vignir.png" alt="Vignir Örn Guðmundsson" />
            <h2>Vignir Örn Guðmundsson</h2>
            <h2>SUT</h2>
          </div>
        </div>
        <div className={s.personCategory}>Operators</div>
        <div className={s.people}>
          <div className={s.person}>
            <img
              src="/img/team/kiddi_kassi.png"
              alt="Kristinn Árni Lár Hróbjartsson"
            />
            <h2>Kristinn Árni Lár Hróbjartsson</h2>
          </div>
          <div className={s.person}>
            <img
              src="/img/team/kristjanmik.jpg"
              alt="Kristján Ingi Mikaelsson"
            />
            <h2>Kristján Ingi Mikaelsson</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Team);
