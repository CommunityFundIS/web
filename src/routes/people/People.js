import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import People from '../../components/People';

class PeopleRoute extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ).isRequired,
  };
  render() {
    const { users } = this.props;
    return (
      <Container style={{ padding: '2em 1em 4em 1em' }}>
        <People people={users} count={100} topicsCount={3} />
      </Container>
    );
  }
}

export default connect(
  state => ({
    users: state.users.data,
  }),
  {},
)(PeopleRoute);
