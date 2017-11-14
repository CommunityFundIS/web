import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import peopleImport from '../../data/people';
import Person from '../Person';

export default class People extends React.Component {
  static propTypes = {
    count: PropTypes.number,
    topicsCount: PropTypes.number,
    people: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  };
  static defaultProps = {
    count: 6,
    topicsCount: 3,
    people: [],
  };
  render() {
    const { count, topicsCount, people } = this.props;
    const array = people.length > 0 ? people : peopleImport;

    return (
      <Card.Group itemsPerRow={4} doubling style={{ justifyContent: 'center' }}>
        {array
          .slice(0, array.length >= count ? count : array.length)
          .map(data => (
            <Person
              {...data}
              key={data.id}
              topicsCount={topicsCount}
              href={`/person/${data.id}`}
            />
          ))}
      </Card.Group>
    );
  }
}
