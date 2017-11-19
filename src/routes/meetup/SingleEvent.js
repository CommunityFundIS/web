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
import SemanticUI from '../../components/SemanticUI';
import People from '../../components/People';
import Link from '../../components/Link';
import s from './SingleEvent.scss';
import attendees from './attendees';

class SingleEvent extends Component {
  state = {};
  handleContextRef = contextRef => this.setState({ contextRef });
  render() {
    const { contextRef } = this.state;
    const invertHeader = false;
    const gradient = 'linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)';
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
            <Image src="/rvkjs2.png" size="small" circular className={s.logo} />
            <Header as="h1" inverted={invertHeader} className={s.text}>
              Javascript Iceland - January Meetup
            </Header>
            <Header as="h3" inverted={invertHeader} className={s.description}>
              It is time for our September JS meetup, the first meetup after the
              legendary JSConf Iceland 2016. In fact we will be celebrating as a
              community for a whole evening filled with great talks and great
              people.
            </Header>

            <Button primary size="huge" style={{ marginTop: 10 }}>
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
              <p className={s.eventDescription}>
                It is time for our September JS meetup, the first meetup after
                the legendary JSConf Iceland 2016. In fact we will be
                celebrating as a community for a whole evening filled with great
                talks and great people. This event will be a bit different. We
                are very lucky to have a visit from a JavaScript/Google
                Developer Expert from Norway. His name is Maxim Salnikov and he
                will be giving a talk on the brand new Angular version. Our
                second talk of the night will be on JSConf Iceland and how
                fantastic that event was for our community. You are in for a
                ride! The venue is of limited size(Gym and Tonic hall at Kex
                Hostel) and therefore we have limited amount of tickets. You
                need to get a ticket in advance, which you can do here:
                https://ti.to/jsconf-is/2016/with/o6lgpuglzts We are a community
                and we welcome anyone to come and join us for the evening!
                Looking forward to seeing you all! ------- By purchasing a
                ticket, you will be explicitly required to agree with our stated
                Code of Conduct: http://confcodeofconduct.com/ You acknowledge
                that if you or a group you are involved with act in a manner not
                in accordance with the code of conduct, you will be expelled
                from the event with no refund.It is time for our September JS
                meetup, the first meetup after the legendary JSConf Iceland
                2016. In fact we will be celebrating as a community for a whole
                evening filled with great talks and great people. This event
                will be a bit different. We are very lucky to have a visit from
                a JavaScript/Google Developer Expert from Norway. His name is
                Maxim Salnikov and he will be giving a talk on the brand new
                Angular version. Our second talk of the night will be on JSConf
                Iceland and how fantastic that event was for our community. You
                are in for a ride! The venue is of limited size(Gym and Tonic
                hall at Kex Hostel) and therefore we have limited amount of
                tickets. You need to get a ticket in advance, which you can do
                here: https://ti.to/jsconf-is/2016/with/o6lgpuglzts We are a
                community and we welcome anyone to come and join us for the
                evening! Looking forward to seeing you all! ------- By
                purchasing a ticket, you will be explicitly required to agree
                with our stated Code of Conduct: http://confcodeofconduct.com/
                You acknowledge that if you or a group you are involved with act
                in a manner not in accordance with the code of conduct, you will
                be expelled from the event with no refund.
              </p>
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
