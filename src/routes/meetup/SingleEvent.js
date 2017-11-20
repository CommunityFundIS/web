/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
import SemanticUI from '../../components/SemanticUI';
import People from '../../components/People';
import Link from '../../components/Link';
import s from './SingleEvent.scss';

class SingleEvent extends Component {
  static propTypes = {
    backgroundColor: PropTypes.arrayOf(PropTypes.string),
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
    backgroundColor: ['#FDEB71', '#F8D800'],
    invertHeader: false,
    attendees: [],
  };
  state = {};
  handleContextRef = contextRef => this.setState({ contextRef });
  render() {
    const {
      backgroundColor,
      title,
      logo,
      shortDescription,
      description,
      invertHeader,
      attendees,
    } = this.props;
    const { contextRef } = this.state;
    const gradient = `linear-gradient( 135deg, ${backgroundColor[0]} 10%, ${backgroundColor[1]} 100%)`;
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

            <Button primary size="huge" className={s.attendButton}>
              Attend meetup
            </Button>
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

        <div style={{ paddingTop: '4em' }} ref={this.handleContextRef}>
          <Grid>
            <Grid.Column width={1} />

            <Grid.Column width={8}>
              <p className={s.eventDescription}>{description}</p>
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
              <Sticky context={contextRef} offset={50} bottomOffset={80}>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      Tuesday, December 19, 2017 5:00 PM to 7:15 PM
                    </Card.Header>

                    <Card.Description>
                      Borgartún 29, 105 Reykjavík
                    </Card.Description>
                  </Card.Content>

                  <Image src="https://maps.google.com/maps/api/staticmap?zoom=17&scale=2&size=480x300&markers=color%3Ared%7Csize%3Alarge%7C64.126518%2C-21.817440&sensor=false&client=gme-meetup1&signature=3C5j6FSInsGuz6lhPuGbEz_SdW8%3D" />
                  <Card.Content extra>
                    <Button primary style={{ width: '100%' }}>
                      Attend
                    </Button>
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
            <People people={attendees} count={100} topicsCount={2} />
            <Container
              textAlign="center"
              style={{ marginTop: '2em', marginBottom: '2em' }}
            >
              <Button as={Link} to="/people" size="large">
                See all attendees
              </Button>
            </Container>
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
      </SemanticUI>
    );
  }
}

export default withStyles(s)(SingleEvent);
