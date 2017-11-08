import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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
  Label,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from 'semantic-ui-css/semantic.min.css';

import { partners, sponsors, supporters } from './backers';
import Footer from '../../components/Footer';
import HeaderMenu from '../../components/HeaderMenu';

import s from './Frontpage.scss';

import people from './people';

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

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Item as="a" href="/" active>
        Home
      </Menu.Item>
      <Menu.Item as="a" href="/guidelines">
        Guidelines
      </Menu.Item>

      <Menu.Item as="a" href="/team">
        Team
      </Menu.Item>
      <Menu.Item as="a" href="/people">
        People
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

class Frontpage extends Component {
  static propTypes = {
    quote: PropTypes.shape(),
  };
  static defaultProps = {
    quote: {},
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
    const { quote } = this.props;

    return (
      <div>
        {visible && pageWidth > 509 ? <FixedMenu /> : null}

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
                content="We support the Icelandic tech community by easing the access to capital for events."
                inverted
                style={{ fontSize: '1.6rem', fontWeight: 'normal' }}
              />
              <Button inverted size="huge" as="a" href="/grant">
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
                  We grow the tech and startup community closer together by
                  making events, meetups, and other initiatives easier to
                  execute. Our partners provide funding, experience, and
                  connections to make your event a success.
                </p>
                {/* <Divider /> */}
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
                  <Step.Description>Apply for a grant</Step.Description>
                </Step.Content>
              </Step>

              <Step
                active={step === 'two'}
                link
                onClick={() => this.setState({ step: 'two' })}
              >
                {pageWidth > 730 && <Icon name="users" />}
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
                {pageWidth > 730 && <Icon name="check" />}
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

        <Container style={{ padding: '2em 1em 4em 1em' }}>
          <Header
            as="h3"
            textAlign="center"
            style={{ fontSize: '3rem', padding: '1em 0 1em' }}
          >
            Meet the community
          </Header>
          <Card.Group
            itemsPerRow={4}
            doubling
            style={{ justifyContent: 'center' }}
          >
            {people
              .slice(0, pageWidth > 991 ? 12 : 6)
              .map(data => (
                <Person
                  {...data}
                  key={data.name}
                  topicsCount={pageWidth >= 460 ? 3 : 2}
                />
              ))}
          </Card.Group>

          <Container textAlign="center" style={{ marginTop: '2em' }}>
            <Button href="/people" size="large">
              See the whole community
            </Button>
          </Container>
        </Container>

        <Footer />
      </div>
    );
  }
}

export default withStyles(s, styles)(Frontpage);
