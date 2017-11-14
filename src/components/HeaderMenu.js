import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Container, Menu, Button, Icon, Dimmer } from 'semantic-ui-react';
import { log } from '../logger';
import Link from './Link';

import s from './HeaderMenu.scss';

class HeaderMenu extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    currentUser: PropTypes.shape(),
  };
  static defaultProps = {
    page: null,
    currentUser: {},
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
    const { page, currentUser } = this.props;
    const { open } = this.state;

    log('currentUser', currentUser);
    return (
      <div>
        <Container className={s.desktop}>
          <Menu inverted secondary size="huge">
            <Menu.Item as={Link} to="/" active={page === 'home'}>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/grant" active={page === 'grant'}>
              Apply
            </Menu.Item>
            <Menu.Item as={Link} to="/people" active={page === 'people'}>
              People
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/guidelines"
              active={page === 'guidelines'}
            >
              Guidelines
            </Menu.Item>
            <Menu.Item as={Link} to="/team" active={page === 'team'}>
              Team
            </Menu.Item>
            <Menu.Item position="right">
              <Button as={Link} inverted to="/signup">
                Join
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
            <Menu.Item as={Link} to="/" active={page === 'home'}>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to="/grant" active={page === 'grant'}>
              Apply
            </Menu.Item>
            <Menu.Item as={Link} to="/signup" active={page === 'signup'}>
              Join
            </Menu.Item>
            <Menu.Item as={Link} to="/people" active={page === 'people'}>
              People
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/guidelines"
              active={page === 'guidelines'}
            >
              Guidelines
            </Menu.Item>
            <Menu.Item as={Link} to="/team" active={page === 'team'}>
              Team
            </Menu.Item>
          </Menu>
        </Dimmer>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.user,
  }),
  {},
)(withStyles(s)(HeaderMenu));
