/* eslint-disable no-shadow */
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import {
  addComment,
  acceptSubmission,
  rejectSubmission
} from '../../actions/castVote';
import s from './VoteForm.css';

const VoteForm = ({
  submissionId,
  comment,
  error,
  addComment,
  acceptSubmission,
  rejectSubmission
}) => (
  <div className={s.voteForm}>
    <h2 className={s.heading}>Your vote</h2>
    <textarea
      type="text"
      value={comment}
      placeholder="Comment"
      className={s.comment}
      onChange={event => addComment(submissionId, event.target.value)}
    />

    <div className={s.buttonContainer}>
      <button
        className={s.accept}
        onClick={() => acceptSubmission(submissionId)}
      >
        Accept
      </button>
      <button
        className={s.reject}
        onClick={() => rejectSubmission(submissionId)}
      >
        Reject
      </button>
    </div>
    {error && <div className={s.error}>{error}</div>}
  </div>
);
VoteForm.propTypes = {
  submissionId: PropTypes.string.isRequired,
  comment: PropTypes.string,
  error: PropTypes.string,
  addComment: PropTypes.func.isRequired,
  acceptSubmission: PropTypes.func.isRequired,
  rejectSubmission: PropTypes.func.isRequired
};

export default connect(
  (state, props) => {
    const castVoteForm = state.castVote[props.submissionId] || {};
    return {
      ...castVoteForm
    };
  },
  {
    addComment,
    acceptSubmission,
    rejectSubmission
  }
)(withStyles(s)(VoteForm));
