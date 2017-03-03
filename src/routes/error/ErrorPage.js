import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ErrorPage.css';
import Link from '../../components/Link';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  };

  render() {
    if (process.env.NODE_ENV !== 'production') {
      const { error } = this.props;
      return (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Oops</h1>
        <p>This page cannot be found. Go to the <Link to="/">Homepage</Link></p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
