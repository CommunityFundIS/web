import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { addComment, castVote } from '../../actions/castVote';
import s from './VoteForm.css';

const VoteForm = ({ submissionId, comment, error, addComment, castVote }) => (
  <div className={s.voteForm}>
    <h3>Your vote</h3>
    <textarea
      type="text"
      value={comment}
      placeholder="Comment"
      className={s.description}
      onChange={({ target: { value } }) => addComment(submissionId, value)}
    />

    <div className={s.acceptContainer}>
      <div
        className={s.accept}
        onClick={() => castVote(submissionId, 'accept')}
      >
        Accept
      </div>
    </div>
    <div className={s.rejectContainer}>
      <div
        className={s.reject}
        onClick={() => castVote(submissionId, 'reject')}
      >
        Reject
      </div>
    </div>
    {error && <div className={s.error}>{error}</div>}
  </div>
);

export default connect(
  (state, props) => {
    const castVoteForm = state.castVote[props.submissionId] || {};
    return {
      ...castVoteForm,
    };
  },
  {
    addComment,
    castVote,
  }
)(withStyles(s)(VoteForm));
