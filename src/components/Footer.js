import React from 'react';
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from './Link';

import s from './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <div>
        <Segment inverted vertical className={s.desktop}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column tablet={2} computer={2}>
                  <Header inverted content="Sitemap" />
                  <List link inverted>
                    <List.Item as={Link} to="/guidelines">
                      Guidelines
                    </List.Item>
                    <List.Item as={Link} to="/team">
                      Team
                    </List.Item>
                    <List.Item as={Link} to="/people">
                      People
                    </List.Item>
                    <List.Item as={Link} to="/grant">
                      Apply
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column tablet={4} computer={4}>
                  <Header inverted content="Information" />
                  <List link inverted>
                    <List.Item>Community Fund ses.</List.Item>
                    <List.Item>kt: 670317-1290</List.Item>
                    <List.Item>rn: 0301-26-5235</List.Item>
                    <List.Item as="a" href="mailto:hello@communityfund.is">
                      hello@communityfund.is
                    </List.Item>
                    <List.Item as="a" href="tel:6964523">
                      sími: 696-4523
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column tablet={8} computer={8}>
                  <Header inverted>Join us</Header>
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
        <Segment inverted vertical className={s.mobile}>
          <Container text textAlign="center">
            <Header inverted content="Information" />
            <List link inverted>
              <List.Item>Community Fund ses.</List.Item>
              <List.Item>kt: 670317-1290</List.Item>
              <List.Item>rn: 0301-26-5235</List.Item>
              <List.Item as="a" href="mailto:hello@communityfund.is">
                hello@communityfund.is
              </List.Item>
              <List.Item as="a" href="tel:6964523">
                sími: 696-4523
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withStyles(s)(Footer);
