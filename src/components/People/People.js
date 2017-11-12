import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import people from '../../data/people';
import Person from '../Person';

export default class People extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    topicsCount: PropTypes.number,
  };
  static defaultProps = {
    count: 6,
    topicsCount: 3,
  };
  render() {
    const { count, topicsCount } = this.props;

    return (
      <Card.Group itemsPerRow={4} doubling style={{ justifyContent: 'center' }}>
        {people
          .slice(0, count)
          .map(data => (
            <Person
              {...data}
              key={data.name}
              topicsCount={topicsCount}
              href={`/person/${data.id}`}
            />
          ))}
      </Card.Group>
    );
  }
}
