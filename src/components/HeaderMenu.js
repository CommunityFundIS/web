import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Container, Menu, Button, Icon, Dimmer } from 'semantic-ui-react';

import s from './HeaderMenu.scss';

class HeaderMenu extends React.Component {
  static propTypes = {
    page: PropTypes.string,
  };
  static defaultProps = {
    page: null,
  };
  state = {
    open: false,
  };
  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }
  render() {
    const { page } = this.props;
    const { open } = this.state;

    return (
      <div>
        <Container className={s.desktop}>
          <Menu inverted secondary size="huge">
            <Menu.Item as="a" href="/" active={page === 'home'}>
              Home
            </Menu.Item>
            <Menu.Item as="a" href="/guidelines" active={page === 'guidelines'}>
              Guidelines
            </Menu.Item>
            <Menu.Item as="a" href="/team" active={page === 'team'}>
              Team
            </Menu.Item>
            <Menu.Item as="a" href="/people" active={page === 'people'}>
              People
            </Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted href="/grant">
                Apply
              </Button>
            </Menu.Item>
          </Menu>
        </Container>
        <Container onClick={() => this.handleClick()} className={s.mobile}>
          <Icon name="content" size="huge" style={{ float: 'right' }} />
        </Container>
        <Dimmer active={open} onClickOutside={() => this.handleClick()} page>
          <Menu
            borderless
            inverted
            secondary
            fluid
            vertical
            pointing
            size="massive"
          >
            <Menu.Item as="a" href="/" active={page === 'home'}>
              Home
            </Menu.Item>
            <Menu.Item as="a" href="/guidelines" active={page === 'guidelines'}>
              Guidelines
            </Menu.Item>
            <Menu.Item as="a" href="/team" active={page === 'team'}>
              Team
            </Menu.Item>
            <Menu.Item as="a" href="/people" active={page === 'people'}>
              People
            </Menu.Item>
            <Menu.Item as="a" href="/grant" active={page === 'grant'}>
              Apply
            </Menu.Item>
          </Menu>
        </Dimmer>
      </div>
    );
  }
}

export default withStyles(s)(HeaderMenu);
