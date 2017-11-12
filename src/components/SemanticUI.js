import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import styles from 'semantic-ui-css/semantic.min.css';

class SemanticUI extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };
  render() {
    return this.props.children;
  }
}

export default withStyles(styles)(SemanticUI);
