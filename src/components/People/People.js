import React from 'react';
import { Image, Card, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import people from '../../data/people';

const Person = ({ id, name, image, title, topics, topicsCount }) => (
  <Card style={{ maxWidth: '212px' }} href={`/person/${id}`}>
    <div style={{ position: 'relative' }}>
      <Image src={image} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'flex-start',
          position: 'absolute',
          left: 14,
          bottom: 2,
        }}
      >
        {topics.slice(0, topicsCount).map(topic => (
          <object key={topic.name}>
            <Label
              as="a"
              color={topic.color}
              size="tiny"
              ribbon
              style={{ marginBottom: 8 }}
              href={`/people?filter=${topic.name}`}
            >
              {topic.name}
            </Label>
          </object>
        ))}
      </div>
    </div>

    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta style={{ fontSize: '0.9em' }}>{title}</Card.Meta>
    </Card.Content>
  </Card>
);

Person.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  topics: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  topicsCount: PropTypes.number,
};

Person.defaultProps = {
  name: '',
  image: '',
  title: '',
  topics: [],
  topicsCount: 3,
};

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
            <Person {...data} key={data.name} topicsCount={topicsCount} />
          ))}
      </Card.Group>
    );
  }
}
