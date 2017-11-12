import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Container, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HeaderMenu from '../HeaderMenu';
import SemanticUI from '../SemanticUI';
import Footer from '../Footer';

import s from './Layout.scss';

class Layout extends Component {
  static propTypes = {
    page: PropTypes.string,
    heading: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.element.isRequired,
    background: PropTypes.string,
  };
  static defaultProps = {
    page: null,
    heading: '',
    description: '',
    background: '/img/background_road.jpg',
  };

  render() {
    const { children, page, heading, description, background } = this.props;

    return (
      <SemanticUI>
        <Segment
          inverted
          textAlign="center"
          style={{
            padding: '1em 0em',
            height: '100vh',
            width: '100vw',
            minHeight: '400px',
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
          }}
          vertical
        >
          <HeaderMenu page={page} />

          <Container text>
            <Header
              as="h1"
              content={heading}
              inverted
              style={{
                fontSize: '2.6rem',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '30vh',
                textTransform: 'uppercase',
              }}
            />
            <Header
              as="h2"
              content={description}
              inverted
              style={{ fontSize: '1.6rem', fontWeight: 'normal' }}
            />
          </Container>
        </Segment>

        <Segment vertical>{children}</Segment>
        <Footer />
      </SemanticUI>
    );
  }
}

export default withStyles(s)(Layout);
