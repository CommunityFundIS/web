import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import moment from 'moment';
import s from './SubmissionPage.css';
import VoteForm from './VoteForm';

const SubmissionDetails = (
  { summary, date, description, askAmount, totalCost, name, email, phone }
) => (
  <div>
    <div className={s.panel}>
      <h2 className={s.heading}>{summary}</h2>
      <p className={s.date}>
        {moment(date).format('MMMM Do YYYY')}
      </p>
      <p className={s.description}>{description}</p>
    </div>
    <div className={s.panel}>
      <h2 className={s.heading}>Amount:</h2>
      <div>
        {askAmount} kr of {totalCost} kr
      </div>
    </div>
    <div className={s.panel}>
      <h2 className={s.heading}>Contact:</h2>
      <ul>
        <li>
          <span className={s.label}>Name:</span>
          {name}
        </li>
        <li>
          <span className={s.label}>Email:</span>
          <a href={`mailto:${email}`}>{email}</a>
        </li>
        <li>
          <span className={s.label}>Phone:</span>
          <a href={`tel:${phone}`}>{phone}</a>
        </li>
      </ul>
    </div>
  </div>
);
SubmissionDetails.propTypes = {
  summary: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string, // Could use React.PropTypes.instanceOf(Date)
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  askAmount: PropTypes.string,
  totalCost: PropTypes.string,
};

const SubmissionPage = ({ submission }) => (
  <div className={s.container}>
    <div className={s.content}>
      <SubmissionDetails {...submission} />
      <VoteForm submissionId={submission.id} />
    </div>
  </div>
);
SubmissionPage.propTypes = {
  submission: PropTypes.object,
};

export default connect(
  (state, props) => ({
    submission: state.submission[props.submissionId],
  }),
  {}
)(withStyles(s)(SubmissionPage));
