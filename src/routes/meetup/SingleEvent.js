/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Image,
  Sticky,
  Grid,
  Card,
  Button,
  Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AttendModal from './AttendModal';
import SemanticUI from '../../components/SemanticUI';
import People from '../../components/People';
import Link from '../../components/Link';
import s from './SingleEvent.scss';

import { logError } from '../../logger';

const attendMutation = require('../../data/mutations/attend.gql').loc.source
  .body;

class SingleEvent extends Component {
  static propTypes = {
    id: PropTypes.string,
    initialAttendingStatus: PropTypes.number,
    currentUser: PropTypes.shape().isRequired,
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
    timestamp: PropTypes.string,
    locationHuman: PropTypes.string,
    locationGPS: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    invertHeader: PropTypes.bool,
    attendees: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        topics: PropTypes.arrayOf(PropTypes.shape()),
      }),
    ),
  };
  static defaultProps = {
    id: '',
    initialAttendingStatus: -1,
    backgroundColor: ['#FDEB71', '#F8D800'],
    invertHeader: false,
    attendees: [],
    locationGPS: [],
    locationHuman: '',
    timestamp: '',
  };
  static contextTypes = {
    graphqlRequest: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      attendingStatus: props.initialAttendingStatus,
      showLoginModal: false,
    };
  }
  handleContextRef = contextRef => this.setState({ contextRef });
  async handleAttend() {
    const { id, currentUser } = this.props;
    const { graphqlRequest } = this.context;
    const { attendingStatus } = this.state;

    // @TODO handle loading and state changes better
    if (!currentUser.id) {
      return this.setState({
        ...this.state,
        showLoginModal: true,
      });
    }
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

    return this.setState({
      ...this.state,
      attendingStatus: attendingStatus !== 1 ? 1 : 0,
    });
  }
  render() {
    const {
      id,
      backgroundColor,
      title,
      logo,
      shortDescription,
      description,
      invertHeader,
      attendees,
      locationGPS,
      locationHuman,
      timestamp,
    } = this.props;
    const { attendingStatus, showLoginModal } = this.state;
    const { contextRef } = this.state;
    const gradient = `linear-gradient( 135deg, ${backgroundColor[0]} 10%, ${backgroundColor[1]} 100%)`;
    const locationCoords = locationGPS.join(',');
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=480x300&zoom=16&scale=2&format=png&maptype=roadmap&markers=size:large%7Ccolor:blue%7Clabel:M%7C${locationCoords}&key=AIzaSyCAelXIsSXBBSbRju6NEJjFMZQyR0TL-kk`;

    return (
      <SemanticUI>
        <Segment
          inverted
          textAlign="center"
          className={s.header}
          style={{
            backgroundImage: gradient,
          }}
          vertical
        >
          <Container text className={s.headerContainer}>
            <Image src={logo} size="small" circular className={s.logo} />
            <Header as="h1" inverted={invertHeader} className={s.title}>
              {title}
            </Header>
            <Header as="h3" inverted={invertHeader} className={s.description}>
              {shortDescription}
            </Header>

            {attendingStatus !== 1 && (
              <Button
                primary
                size="huge"
                className={s.attendButton}
                onClick={() => this.handleAttend()}
              >
                Attend meetup
              </Button>
            )}
            {attendingStatus === 1 && (
              <h3 className={s.attendingText}>
                You are attending this meetup,{' '}
                <span onClick={() => this.handleAttend()}>can't go</span>
              </h3>
            )}
          </Container>
          <Icon
            name="angle down"
            size="huge"
            style={{
              marginTop: -50,
              color: invertHeader ? '#fff' : 'rgba(0,0,0,.87)',
            }}
          />
        </Segment>

        <div
          style={{ paddingTop: '4em', minHeight: 400 }}
          ref={this.handleContextRef}
        >
          <Container text className={s.mobile}>
            <h3 style={{ marginBottom: 0 }}>{timestamp}</h3>
            <h4 style={{ marginTop: 0, marginLeft: 15 }}>at {locationHuman}</h4>
            <p className={s.eventDescription}>{description}</p>
          </Container>
          <Grid className={s.desktop}>
            <Grid.Column width={1} />

            <Grid.Column width={8}>
              <p className={s.eventDescription}>{description}</p>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <Sticky context={contextRef} offset={50} bottomOffset={80}>
                <Card>
                  <Card.Content>
                    <Card.Header>{timestamp}</Card.Header>

                    <Card.Description>{locationHuman}</Card.Description>
                  </Card.Content>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${locationCoords}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image src={mapUrl} />
                  </a>
                  <Card.Content extra>
                    {attendingStatus !== 1 && (
                      <Button
                        primary
                        style={{ width: '100%' }}
                        onClick={() => this.handleAttend()}
                      >
                        Attend
                      </Button>
                    )}
                    {attendingStatus === 1 && (
                      <Button
                        color="orange"
                        style={{ width: '100%' }}
                        onClick={() => this.handleAttend()}
                      >
                        {`Can't go`}
                      </Button>
                    )}
                  </Card.Content>
                </Card>
              </Sticky>
            </Grid.Column>
          </Grid>
        </div>

        <Grid style={{ marginTop: '5em' }}>
          <Grid.Column width={1} />

          <Grid.Column width={14}>
            <Header
              as="h3"
              style={{ fontSize: '2rem', padding: '.8em 0 .4em' }}
            >
              Attendees ({attendees.length})
            </Header>
            {attendees.length > 0 && (
              <People people={attendees} count={100} topicsCount={2} />
            )}
            {attendees.length > 0 && (
              <Container
                textAlign="center"
                style={{ marginTop: '2em', marginBottom: '2em' }}
              >
                <Button as={Link} to="/people" size="large">
                  See all attendees
                </Button>
              </Container>
            )}
            {attendees.length === 0 && (
              <p style={{ marginBottom: 100 }}>
                Be the first to attend this event!
              </p>
            )}
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
        <AttendModal
          eventId={id}
          open={showLoginModal}
          handleOnClose={() =>
            this.setState({ ...this.state, showLoginModal: false })}
        />
      </SemanticUI>
    );
  }
}

export default connect(({ user }) => ({ currentUser: user }), {})(
  withStyles(s)(SingleEvent),
);
