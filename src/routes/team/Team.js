import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Card, Icon, Image, Container, Header } from 'semantic-ui-react';
import s from './Team.scss';

const reviewers = [
  {
    name: 'Arndís Ósk Jónsdóttir',
    about: '',
    nominator: 'Tempo',
    image: '/img/team/arndis.png',
    nominatorUrl: 'https://tempo.io',
  },
  {
    name: 'Guðbjörg Rist Jónsdóttir',
    about: '',
    nominator: 'Northstack',
    image: '/img/team/gudbjorg.jpg',
    nominatorUrl: 'http://northstack.is',
  },
  {
    name: 'Hjálmar Gíslason',
    about: '',
    nominator: 'Investa',
    image: '/img/team/hjalli.jpg',
    nominatorUrl: 'http://investa.is',
  },
  {
    name: 'Kristján Ingi Mikaelsson',
    about: '',
    nominator: 'Community Fund',
    image: '/img/team/kristjanmik.jpg',
    nominatorUrl: 'https://communityfund.is',
  },
  {
    name: 'Vignir Örn Guðmundsson',
    about: '',
    nominator: 'SUT',
    image: '/img/team/vignir.png',
    nominatorUrl: 'http://www.si.is/hugverk-og-thjonusta/sut',
  },
];

const operators = [
  {
    name: 'Kristinn Árni Lár Hróbjartsson',
    image: '/img/team/kiddi_kassi.png',
    about: '',
    phone: '823-5253',
  },
  {
    name: 'Kristján Ingi Mikaelsson',
    image: '/img/team/kristjanmik.jpg',
    about: '',
    phone: '696-4523',
  },
];

class Team extends Component {
  render() {
    return (
      <div>
        <Header
          as="h1"
          style={{
            fontSize: '2rem',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            padding: '2em 0 1em',
          }}
          textAlign="center"
        >
          Review Board
        </Header>
        <Container text style={{ marginBottom: '1em' }}>
          The grant review board is nominated by financial partners (3
          nominations) and the two founders, Kristinn Hróbjartsson and Kristján
          Mikaelsson. The review board votes on all applications. A simple
          majority rules, and all votes are equal.
        </Container>
        <Container
          as={Card.Group}
          itemsPerRow={5}
          doubling
          style={{ justifyContent: 'center' }}
        >
          {reviewers.map(({ name, image, about, nominator, nominatorUrl }) => (
            <Card key={name}>
              <Image src={image} />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{about}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a
                  href={nominatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="user" />
                  {nominator}
                </a>
              </Card.Content>
            </Card>
          ))}
        </Container>

        <Header
          as="h1"
          style={{
            fontSize: '2rem',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            padding: '2em 0 1em',
          }}
          textAlign="center"
        >
          Operators
        </Header>
        <Container text>
          The operators are responsible for all operational parts of the fund:
          keeping the books, wiring the money, maintaining the website and so
          forth. The operators, Kristinn and Kristján, are also the founders of
          the fund.
        </Container>
        <Container
          as={Card.Group}
          itemsPerRow={2}
          style={{ justifyContent: 'center' }}
        >
          {operators.map(({ name, image, about, phone }) => (
            <Card style={{ maxWidth: 275 }} key={name}>
              <Image src={image} />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>{about}</Card.Description>
                <Card.Description style={{ margin: '8px 0 3px' }}>
                  <a href={`tel:${phone}`} style={{ color: 'rgba(0,0,0,.4)' }}>
                    <Icon name="phone" />
                    696-4523
                  </a>
                </Card.Description>
                <Card.Description>
                  <a
                    href="mailto:hello@communityfund.is"
                    style={{ color: 'rgba(0,0,0,.4)' }}
                  >
                    <Icon name="mail outline" />
                    hello@communityfund.is
                  </a>
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Container>
        {/* TODO: Add contributors */}
        {/* <Header
          as="h1"
          style={{
            fontSize: '2rem',
            fontWeight: 'normal',
            textTransform: 'uppercase',
            padding: '2em 0 1em',
          }}
          textAlign="center"
        >
          Contributors
        </Header>
        <Container text>
          True to its purpose, the Community Fund is a community initiative. 
          We're lucky to have received the invaluable support and contributions 
          from the tech community.
        </Container> */}
      </div>
    );
  }
}

export default withStyles(s)(Team);
