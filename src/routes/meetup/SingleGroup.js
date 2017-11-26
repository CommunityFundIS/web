/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import {
  Segment,
  Container,
  Header,
  Image,
  Item,
  Statistic,
  Button,
} from 'semantic-ui-react';
import Link from '../../components/Link';
import SemanticUI from '../../components/SemanticUI';
import s from './SingleGroup.scss';

const Event = ({ url, day, month, title, shortDescription }) => (
  <Item>
    <div className={s.eventDate}>
      <Statistic size="mini" style={{ margin: 0 }}>
        <Statistic.Value>{day}</Statistic.Value>
        <Statistic.Label>{month}</Statistic.Label>
      </Statistic>
      <Button
        primary
        size="mini"
        style={{ padding: '6px 8px', marginRight: 0, marginTop: 5 }}
      >
        ATTEND
      </Button>
    </div>

    <Item.Content>
      <Link as={Item.Header} to={url} className={s.eventHeading}>
        {title}
      </Link>
      <Item.Description>{shortDescription}</Item.Description>
    </Item.Content>
  </Item>
);

Event.propTypes = {
  url: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

class SingleGroup extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string,
        month: PropTypes.string,
        title: PropTypes.string,
        shortDescription: PropTypes.string,
      }),
    ),
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    logo: PropTypes.string.isRequired,
  };
  static defaultProps = {
    events: [],
    backgroundColor: ['#FDEB71', '#F8D800'],
  };
  render() {
    const invertHeaderText = false;
    const { name, about, events, backgroundColor, logo } = this.props;
    return (
      <SemanticUI>
        <Segment
          inverted
          textAlign="center"
          className={s.header}
          style={{
            backgroundImage: `linear-gradient( 135deg, ${backgroundColor[0]} 10%, ${backgroundColor[1]} 100%)`,
          }}
          vertical
        >
          <Container
            text
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={logo} size="small" circular className={s.logo} />
            <Header as="h1" inverted={invertHeaderText} className={s.text}>
              {name}
            </Header>
            <Header
              as="h3"
              inverted={invertHeaderText}
              className={s.description}
            >
              {about}
            </Header>
          </Container>
        </Segment>

        <Segment vertical style={{ paddingBottom: '5em' }}>
          <Container text>
            <Header
              as="h3"
              style={{ fontSize: '2rem', padding: '.8em 0 .4em' }}
            >
              Upcoming meetups
            </Header>
            <Item.Group>{events.map(Event)}</Item.Group>
          </Container>
        </Segment>
      </SemanticUI>
    );
  }
}

export default withStyles(s)(SingleGroup);
