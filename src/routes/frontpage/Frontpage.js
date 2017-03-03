import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Frontpage.css';

class Frontpage extends Component {
  render() {
    return (
      <div>Community fund frontpage!</div>
    );
  }
}

export default withStyles(s)(Frontpage);
