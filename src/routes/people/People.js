import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import People from '../../components/People';

export default class PeopleRoute extends Component {
  render() {
    return (
      <Container style={{ padding: '2em 1em 4em 1em' }}>
        <People count={12} topicsCount={3} />
      </Container>
    );
  }
}
