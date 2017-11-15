import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Visibility,
  Input,
  Card,
  Step,
  Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { partners, sponsors, supporters } from './backers';
import SemanticUI from '../../components/SemanticUI';
import Footer from '../../components/Footer';
import HeaderMenu from '../../components/HeaderMenu';
import People from '../../components/People';
import Link from '../../components/Link';

import s from './Frontpage.scss';

const Sponsor = ({ name, logo, url, description, type }) => (
  <Card
    link
    key={name}
    href={url}
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
    description={
      type === 'Financial Partner' ? (
        <span className={s.sponsorDescription}>{description}</span>
      ) : null
    }
  />
);

Sponsor.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const FixedMenu = loggedIn => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Item as={Link} to="/" active>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/grant">
        Apply
      </Menu.Item>
      <Menu.Item as={Link} to="/people">
        People
      </Menu.Item>
      <Menu.Item as={Link} to="/guidelines">
        Guidelines
      </Menu.Item>
      <Menu.Item as={Link} to="/team">
        Team
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item className="item">
          {loggedIn && (
            <Button as={Link} color="blue" to="/home">
              My account
            </Button>
          )}
          {!loggedIn && (
            <Button as={Link} color="blue" to="/signup">
              Join
            </Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

class Frontpage extends Component {
  static propTypes = {
    quote: PropTypes.shape(),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
      }),
    ).isRequired,
    currentUser: PropTypes.shape(),
  };
  static defaultProps = {
    quote: {},
    currentUser: {},
  };

  state = {
    visible: false,
    step: 'one',
    pageWidth: 1260,
  };

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });
  handleVisibilityUpdate = (e, { calculations }) => {
    if (calculations && calculations.width) {
      this.setState({
        pageWidth: calculations.width,
      });
    }
  };

  render() {
    const { visible, step, pageWidth } = this.state;
    const { quote, users, currentUser } = this.props;

    const loggedIn = currentUser && !!currentUser.id;

    return (
      <SemanticUI>
        {visible && pageWidth > 509 ? <FixedMenu loggedIn={loggedIn} /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          onUpdate={this.handleVisibilityUpdate}
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
            <HeaderMenu page="home" />

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
                content="We support the Icelandic tech community by funding events and initiatives."
                inverted
                style={{ fontSize: '1.6rem', fontWeight: 'normal' }}
              />
              <Button as={Link} inverted size="huge" to="/grant">
                Apply for a grant
                <Icon name="right arrow" />
              </Button>
            </Container>

            <Container
              as={Container}
              text
              style={{ paddingTop: '3em' }}
              className={s.quoteContainer}
            >
              <Message
                compact
                size="small"
                icon="quote left"
                header={`${quote.name} - ${quote.title}`}
                content={quote.text}
              />
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '5em 0' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2rem' }}>
                  Plan events around your passion
                </Header>
                <p style={{ fontSize: '1.33em', marginBottom: '1em' }}>
                  Our mission is to build a stronger tech community by
                  supporting events and initiatives driven by the community,
                  that foster skill development and knowledge sharing.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={7}>
                <Header
                  as="h3"
                  style={{ fontSize: '1.5rem' }}
                  textAlign="center"
                >
                  Sign up for our event newsletter
                </Header>
                <Segment
                  padded
                  compact
                  textAlign="center"
                  style={{ margin: 'auto' }}
                >
                  <form
                    action="//communityfund.us14.list-manage.com/subscribe/post?u=60fd5c50c834ceb92626f21d8&amp;id=62b8379d4e"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                  >
                    <Input
                      fluid
                      type="email"
                      id="mce-EMAIL"
                      icon="newspaper"
                      iconPosition="left"
                      placeholder="Email"
                      action={{
                        color: 'orange',
                        content: 'Sign up',
                      }}
                      style={{ minWidth: '255px' }}
                    />
                  </form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Header
          as="h3"
          textAlign="center"
          style={{
            fontSize: '2.6rem',
            padding: '1.5em 0 1em',
            textTransform: 'uppercase',
          }}
        >
          Our awesome partners
        </Header>

        <Container>
          <Card.Group itemsPerRow={pageWidth >= 580 ? 3 : 1}>
            {partners.map(data => (
              <Sponsor {...data} key={data.name} type="Financial Partner" />
            ))}
          </Card.Group>
          <Card.Group itemsPerRow={pageWidth >= 580 ? 4 : 2}>
            {sponsors.map(data => (
              <Sponsor {...data} key={data.name} type="Sponsor" />
            ))}
            {supporters.map(data => (
              <Sponsor {...data} key={data.name} type="Supporter" />
            ))}
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
            <Step.Group
              fluid
              unstackable={pageWidth > 512}
              size={pageWidth > 590 || pageWidth < 513 ? 'small' : 'tiny'}
            >
              <Step
                active={step === 'one'}
                link
                onClick={() => this.setState({ step: 'one' })}
              >
                {pageWidth > 730 && <Icon name="wpforms" />}
                <Step.Content>
                  <Step.Title>Application</Step.Title>
                  <Step.Description>
                    Takes less than 15 minutes
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step
                active={step === 'two'}
                link
                onClick={() => this.setState({ step: 'two' })}
              >
                {pageWidth > 730 && <Icon name="users" />}
                <Step.Content>
                  <Step.Title>We Review</Step.Title>
                  <Step.Description>
                    We answer within 5 working days
                  </Step.Description>
                </Step.Content>
              </Step>

              <Step
                active={step === 'three'}
                link
                onClick={() => this.setState({ step: 'three' })}
              >
                {pageWidth > 730 && <Icon name="check" />}
                <Step.Content>
                  <Step.Title>Funds Wired</Step.Title>
                  <Step.Description>
                    Within two days if accepted
                  </Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Container>

          <Container text>
            {step === 'one' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                Fill out a simple form describing your event or initiative.
                Please make sure to read our{' '}
                <Link to="/guidelines">guidelines</Link> before submitting an{' '}
                <Link to="/grant">application.</Link>
              </p>
            )}
            {step === 'two' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                Our five person review committee votes on the application. We
                try very hard to answer all applications within 5 working days.
                Read more about our review committee{' '}
                <Link to="/team">here</Link>
              </p>
            )}
            {step === 'three' && (
              <p style={{ fontSize: '1.5rem', marginTop: '2em' }}>
                We will wire you the money within two days of your application
                being accepted. At this point you should be ready to go, but you
                can always <a href="mailto:hello@communityfund.is">
                  reach out
                </a>{' '}
                to us if you require any assistance.
              </p>
            )}
          </Container>
        </Container>

        <Container style={{ padding: '2em 1em 4em 1em' }}>
          <Header
            as="h3"
            textAlign="center"
            style={{ fontSize: '3rem', padding: '1em 0 1em' }}
          >
            Meet the community
          </Header>
          <People
            people={users}
            count={pageWidth > 991 ? 12 : 6}
            topicsCount={pageWidth >= 460 ? 3 : 2}
          />

          <Container textAlign="center" style={{ marginTop: '2em' }}>
            <Button as={Link} to="/people" size="large">
              See the whole community
            </Button>
          </Container>
        </Container>

        <Footer />
      </SemanticUI>
    );
  }
}

export default connect(
  state => ({
    users: state.users.data,
    currentUser: state.user,
  }),
  {},
)(withStyles(s)(Frontpage));
