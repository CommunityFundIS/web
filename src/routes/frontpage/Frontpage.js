import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Input,
  Card,
  Step,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from 'semantic-ui-css/semantic.min.css';

import { partners, sponsors, supporters } from './backers';
import s from './Frontpage.scss';

const quotes = [
  {
    name: 'Ásgeir Vísir',
    text:
      'Community Fund made it possible, and actually pretty easy, to organize UXuðir’s first meetup. 10/10 would reccomend.',
    image: '/img/people/visir.jpg',
    title: 'UI/UX designer at Watchbox',
  },
  {
    name: 'Kristján Ingi',
    text: 'Game changer for dev communities',
    image: '/img/team/kristjanmik.jpg',
    title: 'JS Iceland, JSConf Iceland',
  },
];

const Sponsor = ({ name, logo, url, description, type }) => (
  <Card
    link
    href={url}
    // image={<Image src={logo} centered style={{ backgroundColor: 'white' }} />}
    image={
      <Image
        src={logo}
        centered
        style={{ backgroundColor: 'white' }}
        width="85%"
      />
    }
    header={name}
    meta={type}
    description={type === 'Financial Partner' ? description : null}
  />
);
Sponsor.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Item as="a" active>
        Home
      </Menu.Item>
      <Menu.Item as="a" href="/guidelines">
        Guidelines
      </Menu.Item>
      <Menu.Item as="a" href="/about">
        About
      </Menu.Item>
      <Menu.Item as="a" href="/team">
        Team
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item className="item">
          <Button as="a" color="blue" href="/grant">
            Apply
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

class Frontpage2 extends Component {
  state = {
    visible: false,
    step: 'one',
  };

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });

  render() {
    const { visible, step } = this.state;

    // const firstQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // const secondQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const firstQuote = quotes[0];
    const secondQuote = quotes[1];

    return (
      <div>
        {visible ? <FixedMenu /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign="center"
            style={{
              padding: '1em 0em',
              height: '100vh',
              width: '100vw',
              minHeight: '400px',
              backgroundImage: 'url(/img/background_road.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              backgroundSize: 'cover',
            }}
            vertical
          >
            <Container>
              <Menu inverted secondary size="huge">
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a" href="/guidelines">
                  Guidelines
                </Menu.Item>
                <Menu.Item as="a" href="/about">
                  About
                </Menu.Item>
                <Menu.Item as="a" href="/team">
                  Team
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted href="/grant">
                    Apply
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>

            <Container text>
              <Header
                as="h1"
                content="PLANNING A COMMUNITY EVENT?"
                inverted
                style={{
                  fontSize: '2.6rem',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '30vh',
                }}
              />
              <Header
                as="h2"
                content="We support the Icelandic tech community by easing the access to capital for events."
                inverted
                style={{ fontSize: '1.6rem', fontWeight: 'normal' }}
              />
              <Button inverted size="huge">
                Apply for a grant
                <Icon name="right arrow" />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2rem' }}>
                  Plan events around your passion
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  We grow the tech and startup community closer together by
                  making events, meetups, and other initiatives easier to
                  execute. Our partners provide funding, experience, and
                  connections to make your event a success.
                </p>
                {/* <Divider /> */}
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Header as="h3" style={{ fontSize: '1.5rem' }}>
                  Sign up for our event newsletter
                </Header>
                <Segment padded compact>
                  <Input
                    fluid
                    icon="newspaper"
                    iconPosition="left"
                    placeholder="Email"
                    action={{
                      color: 'orange',
                      content: 'Sign up',
                    }}
                    style={{ minWidth: '255px' }}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as="h3" style={{ fontSize: '1.5rem' }}>
                  {firstQuote.text}
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src={firstQuote.image} />
                  <b>{firstQuote.name}</b> {firstQuote.title}
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as="h3" style={{ fontSize: '1.5rem' }}>
                  {secondQuote.text}
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src={secondQuote.image} />
                  <b>{secondQuote.name}</b> {secondQuote.title}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Header
          as="h3"
          textAlign="center"
          style={{
            fontSize: '2.6rem',
            padding: '2em 0 1em',
            textTransform: 'uppercase',
          }}
        >
          Our awesome partners
        </Header>

        <Container>
          <Card.Group itemsPerRow={3} stackable doubling>
            {partners.map(data => (
              <Sponsor {...data} type="Financial Partner" />
            ))}
          </Card.Group>
          <Card.Group itemsPerRow={4}>
            {sponsors.map(data => <Sponsor {...data} type="Sponsor" />)}
            {supporters.map(data => <Sponsor {...data} type="Supporter" />)}
          </Card.Group>
        </Container>

        <Container>
          <Header
            as="h3"
            textAlign="center"
            style={{ fontSize: '3rem', padding: '2em 0 1em' }}
          >
            How does it work?
          </Header>

          <Container textAlign="center">
            <Step.Group size="large" fluid>
              <Step
                active={step === 'one'}
                link
                onClick={() => this.setState({ step: 'one' })}
              >
                <Icon name="wpforms" />
                <Step.Content>
                  <Step.Title>Application</Step.Title>
                  <Step.Description>Apply for a grant</Step.Description>
                </Step.Content>
              </Step>

              <Step
                active={step === 'two'}
                link
                onClick={() => this.setState({ step: 'two' })}
              >
                <Icon name="users" />
                <Step.Content>
                  <Step.Title>Review Committee</Step.Title>
                  <Step.Description>Application is reviewed</Step.Description>
                </Step.Content>
              </Step>

              <Step
                active={step === 'three'}
                link
                onClick={() => this.setState({ step: 'three' })}
              >
                <Icon name="check" />
                <Step.Content>
                  <Step.Title>Funds Wired</Step.Title>
                  <Step.Description>We wire you the funds</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Container>

          <Container text>
            {step === 'one' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                It takes you around 15 minutes to fill out our super convenient
                form. The form guides you through the whole process. Make sure
                you read our <a href="/guidelines">guidelines</a> before you
                submit your <a href="/grant">application</a>.
              </p>
            )}
            {step === 'two' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                The review committee consists of 5 members nominated by our
                financial partners and operators. We always get back to you
                within 3 working days and reply to you even if the application
                is rejected. You can read more about our committee members
                <a href="/team">here</a>
              </p>
            )}
            {step === 'three' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                If the application was approved we will wire you the funds to
                your bank account. At this point you should be ready to go, but
                you can always{' '}
                <a href="mailto:hello@communityfund.co">reach out</a> to us if
                you require any assistance.
              </p>
            )}
          </Container>
        </Container>

        <Container>
          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: '5em 0 2em', textTransform: 'uppercase' }}
          >
            <a href="#news" id="news">
              News
            </a>
          </Divider>
        </Container>

        <Segment vertical>
          <Container text style={{ marginBottom: '3em' }}>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Community Fund supports a parliament election hackathon
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              The review committee handed out 50.000 ISK to a grassroots
              hackathon that took place at Reykjavik University. The goal of the
              hackathon is to build tools and publish information for voters.
              Projects will be released at the Kjóstu rétt website.
            </p>
            {/* <Button as="a" size="large">
              Read More
            </Button> */}
          </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Sitemap" />
                  <List link inverted>
                    <List.Item as="a" href="/guidelines">
                      Guidelines
                    </List.Item>
                    <List.Item as="a" href="/about">
                      About
                    </List.Item>
                    <List.Item as="a" href="/team">
                      Team
                    </List.Item>
                    <List.Item as="a" href="/grant">
                      Apply
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Information" />
                  <List link inverted>
                    <List.Item>Community Fund ses.</List.Item>
                    <List.Item>kt: 670317-1290</List.Item>
                    <List.Item>rn: 0301-26-5235</List.Item>
                    <List.Item as="a" href="mailto:hello@communityfund.co">
                      hello@communityfund.co
                    </List.Item>
                    <List.Item as="a" href="tel:6964523">
                      sími: 696-4523
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Join us
                  </Header>
                  <p>
                    We are a group of activists who want to grow the community
                    by making it more inclusive and supportive. If you have any
                    tips, tricks or feedback or you want to help out, please
                    contact us :)
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withStyles(s, styles)(Frontpage2);
