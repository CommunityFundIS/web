import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import s from './ContentPage.css';

class Team extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className={s.container}>
        <Header />
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
        <Footer />
      </div>
    );
  }
}

export default withStyles(s)(Team);
