/* eslint-disable react/no-multi-comp */

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
import { logError } from '../../logger';
import s from './SingleGroup.scss';

const attendMutation = require('../../data/mutations/attend.gql').loc.source
  .body;

class Event extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    attendingStatus: PropTypes.number.isRequired,
  };
  static contextTypes = {
    graphqlRequest: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      attendingStatus: this.props.attendingStatus,
    };
  }
  async handleAttend() {
    const { id } = this.props;
    const { graphqlRequest } = this.context;
    const { attendingStatus } = this.state;
    // @TODO handle loading and state changes better

    try {
      const { errors } = await graphqlRequest(attendMutation, {
        eventId: id,
        action: attendingStatus !== 1 ? 'attend' : 'not-going',
      });

      if (errors) {
        logError(errors);
        return false;
      }
    } catch (e) {
      logError('Failed to mutate updateUser', e);
      return false;
    }

    this.setState({
      ...this.state,
      attendingStatus: attendingStatus !== 1 ? 1 : 0,
    });
  }
  render() {
    const { url, day, month, title, shortDescription } = this.props;
    const { attendingStatus } = this.state;

    return (
      <Item>
        <div className={s.eventDate}>
          <Statistic size="mini" style={{ margin: 0 }}>
            <Statistic.Value>{day}</Statistic.Value>
            <Statistic.Label>{month}</Statistic.Label>
          </Statistic>
          {attendingStatus !== 1 && (
            <Button
              primary
              size="mini"
              style={{ padding: '6px 8px', marginRight: 0, marginTop: 5 }}
              onClick={() => this.handleAttend()}
            >
              ATTEND
            </Button>
          )}
          {attendingStatus === 1 && (
            <Button
              color="orange"
              size="mini"
              style={{ padding: '6px 8px', marginRight: 0, marginTop: 5 }}
              onClick={() => this.handleAttend()}
            >
              {`Can't go`}
            </Button>
          )}
        </div>

        <Item.Content>
          <Link to={url} className={s.eventHeading}>
            {title}
          </Link>
          <Item.Description>{shortDescription}</Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

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
    const { name, about, backgroundColor, logo, events } = this.props;
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
            <Item.Group>
              {events.map(data => <Event {...data} key={data.id} />)}
            </Item.Group>
          </Container>
        </Segment>
      </SemanticUI>
    );
  }
}

export default withStyles(s)(SingleGroup);
