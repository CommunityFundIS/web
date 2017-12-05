import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Grid, Image, Form, Segment, Button, Message } from 'semantic-ui-react';
import Link from '../../components/Link';
import { logError } from '../../logger';

import s from './Login.scss';

class Login extends React.Component {
  static propTypes = {
    redirect: PropTypes.string,
    andAttend: PropTypes.string,
    forwardTo: PropTypes.string,
  };
  static defaultProps = {
    redirect: null,
    andAttend: undefined,
    forwardTo: undefined,
  };
  static contextTypes = { fetch: PropTypes.func };
  state = {
    email: '',
    password: '',
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  async handleSubmit() {
    const { email, password } = this.state;
    const { forwardTo, andAttend } = this.props;

    const response = await this.context.fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        andAttend,
      }),
    });

    let data = {
      error: 'Something went wrong',
    };

    try {
      data = await response.json();
    } catch (e) {
      logError(e);
    }

    if (data.success) {
      // We can't use history because the next request won't be authenticated if we do not reload the page
      if (forwardTo) {
        window.location = forwardTo;
      } else {
        window.location = '/home';
      }
    } else {
      // @TODO handle errors
      logError(data.error);
      this.setState({
        error: data.error,
      });
    }
  }
  render() {
    const { email, password, error } = this.state;
    const { redirect } = this.props;

    return (
      <div className={s.root}>
        <Grid
          textAlign="center"
          style={{ height: '100%', minHeight: '100vh', margin: 0 }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }} mobile={14}>
            <Image
              as={Link}
              to="/"
              src="/logos/transparent_logo.png"
              size="medium"
              style={{
                margin: 'auto',
                marginBottom: '1.4em',
                cursor: 'pointer',
              }}
            />
            {redirect === 'reset-success' && (
              <Message
                success
                header="Password has been reset"
                content="You can now log in with your new password"
              />
            )}
            <Form size="large" error={!!error}>
              <Message error content={error} size="tiny" />
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onChange={(...args) => this.handleChange(...args)}
                  value={email}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(...args) => this.handleChange(...args)}
                />

                <Link
                  to="/reset"
                  style={{ float: 'left', marginBottom: '1em' }}
                >
                  Forgotten password?
                </Link>

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => this.handleSubmit()}
                >
                  Log in
                </Button>
              </Segment>
            </Form>
            <Message>
              Need an account? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Login);
