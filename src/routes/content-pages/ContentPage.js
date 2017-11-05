/* eslint-disable react/no-danger */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ContentPage.scss';

class ContentPage extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className={s.container}>
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </div>
    );
  }
}

export default withStyles(s)(ContentPage);
