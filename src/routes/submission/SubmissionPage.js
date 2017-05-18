import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import moment from 'moment';
import Header from '../../components/Header';
import s from './SubmissionPage.css';
import VoteForm from './VoteForm';

const SubmissionDetails = ({
  summary,
  date,
  description,
  askAmount,
  totalCost,
  name,
  email,
  phone
}) => {
  const processedDescription = (description || '')
    .split('\n')
    .map(line => (line.length === 0 ? <br /> : <p>{line}</p>));

  return (
    <div style={{ marginTop: '30px' }}>
      <div className={s.panel}>
        <h2 className={s.subHeading}>Application</h2>
        <h2 className={s.heading}>{summary}</h2>
        <p className={s.date}>
          Hosted at: {moment(date).format('MMMM Do YYYY')}
        </p>
        <h2 className={s.heading} style={{ marginTop: '15px' }}>
          Event description
        </h2>
        <div className={s.description}>{processedDescription}</div>
      </div>
      <div className={s.panel}>
        <h2 className={s.heading}>Amount:</h2>
        <div>
          {askAmount} kr. of {totalCost} kr.
        </div>
      </div>
      <div className={s.panel}>
        <h2 className={s.heading}>Applicant:</h2>
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
};
SubmissionDetails.propTypes = {
  summary: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string, // Could use React.PropTypes.instanceOf(Date)
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  askAmount: PropTypes.string,
  totalCost: PropTypes.string
};

const SubmissionPage = ({ currentUser, submission, status }) => {
  const canVote =
    currentUser.isReviewer &&
    status.result === 'pending' &&
    status.votes.filter(vote => vote.userId === currentUser.id).length === 0;
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Header />
        <SubmissionDetails {...submission} />
        {canVote && <VoteForm submissionId={submission.id} />}
        <div>
          <h2 className={s.heading}>Application Status</h2>
          <div>Status: {status.result}</div>
          {status.votes.length > 0 && <h2 className={s.heading}>Votes</h2>}
          <div>
            {status.votes.map(vote => (
              <span key={vote.id}>
                {vote.result === 'accepted' ? 'Y' : 'N'}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
SubmissionPage.propTypes = {
  currentUser: PropTypes.object,
  submission: PropTypes.object,
  status: PropTypes.object
};

export default connect(
  (state, props) => ({
    currentUser: state.user,
    submission: state.submission[props.submissionId],
    status: state.submissionStatus[props.submissionId]
  }),
  {}
)(withStyles(s)(SubmissionPage));
