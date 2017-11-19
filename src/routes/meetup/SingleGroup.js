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

const events = [
  {
    day: '19',
    month: 'nov',
    title: 'Javascript Iceland - September Meetup',
    shortDescription: `It is time for our September JS meetup, the first meetup after the
        legendary JSConf Iceland 2016. In fact we will be celebrating as a
        community for a whole evening filled with great talks and great people.`,
  },
  {
    day: '3',
    month: 'jan',
    title: 'Javascript Iceland - January Meetup',
    shortDescription: `It is time for our September JS meetup, the first meetup after the
        legendary JSConf Iceland 2016. In fact we will be celebrating as a
        community for a whole evening filled with great talks and great people.`,
  },
];

const Event = ({ day, month, title, shortDescription }) => (
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
      <Link as={Item.Header} to="/foobar" className={s.eventHeading}>
        {title}
      </Link>
      <Item.Description>{shortDescription}</Item.Description>
    </Item.Content>
  </Item>
);

Event.propTypes = {
  day: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};

class SingleGroup extends Component {
  render() {
    const invertHeaderText = false;
    return (
      <SemanticUI>
        <Segment
          inverted
          textAlign="center"
          className={s.header}
          style={{
            backgroundImage:
              'linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)',
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
            <Image src="/rvkjs2.png" size="small" circular className={s.logo} />
            <Header as="h1" inverted={invertHeaderText} className={s.text}>
              RVK.js
            </Header>
            <Header
              as="h3"
              inverted={invertHeaderText}
              className={s.description}
            >
              A free + public hangout for JavaScript enthusiasts that happens in
              Reykjavik, Iceland, just before JSConf Iceland. No presentations,
              RSVPs or any formal schedule, just show up and talk, learn and
              hack!
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
