import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import s from './GrantFormSuccess.css';
import Link from '../../components/Link';

const GrantFormSuccess = ({ id, email }) => {
  const steps = [
    `We've sent a copy of this application to your email (${email})`,
    'Our team has received the details of your application and will begin voting as soon as possible.',
    "Finally, we'll contact you when we've decided on your submission.",
  ];
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>Thank you for your application!</h1>
        <h2 className={s.subHeading}>What will happen now?</h2>
        <ul className={s.nextSteps}>
          {steps.map(stepText => (
            <li key={stepText} className={s.step}>
              {stepText}
            </li>
          ))}
        </ul>
        <p>
          <Link className={s.yourSubmissionLink} to={`/submission/${id}/`}>
            Your submission
          </Link>
          <Link to="/">Back to front page</Link>
        </p>
      </div>
    </div>
  );
};

GrantFormSuccess.propTypes = {
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(
  (state /* , props */) => ({
    ...state.grant.submission,
  }),
  {},
)(withStyles(s)(GrantFormSuccess));
