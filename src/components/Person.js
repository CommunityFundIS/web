/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Label } from 'semantic-ui-react';
import Link from './Link';

export default class Person extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    image: PropTypes.any,
    title: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    topicsCount: PropTypes.number,
    href: PropTypes.string,
  };

  static defaultProps = {
    name: '',
    image: '',
    title: '',
    topics: [],
    topicsCount: 3,
    href: undefined,
  };
  render() {
    const { name, image, title, topics, topicsCount, href } = this.props;

    let img;
    if (typeof image === 'string') {
      img = <Image src={image} />;
    } else {
      img = image;
    }

    return (
      <Card style={{ maxWidth: '212px' }} as={Link} to={href}>
        <div style={{ position: 'relative' }}>
          {img}
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
          <Card.Header style={{ wordBreak: 'break-word' }}>{name}</Card.Header>
          <Card.Meta style={{ fontSize: '0.9em', wordBreak: 'break-word' }}>
            {title}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}
