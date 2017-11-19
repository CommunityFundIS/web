/* eslint no-shadow: ["error", { "allow": ["inputChange","submitGrant"]}] */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Container,
  Form,
  Input,
  Header,
  TextArea,
  Button,
  Icon,
} from 'semantic-ui-react';
import SemanticUI from '../../components/SemanticUI';
import { log, logError } from '../../logger';
import s from './CreateEvent.scss';

const colorData = [
  ['#FDEB71', '#F8D800'],
  ['#ABDCFF', '#0396FF'],
  ['#FEB692', '#EA5455'],
  ['#CE9FFC', '#7367F0'],
  ['#90F7EC', '#32CCBC'],
  ['#FFF6B7', '#F6416C'],
  ['#81FBB8', '#28C76F'],
  ['#E2B0FF', '#9F44D3'],
  ['#F97794', '#623AA2'],
  ['#FCCF31', '#F55555'],
  ['#F761A1', '#8C1BAB'],
  ['#43CBFF', '#9708CC'],
  ['#5EFCE8', '#736EFE'],
  ['#FAD7A1', '#E96D71'],
  ['#FFD26F', '#3677FF'],
  ['#A0FE65', '#FA016D'],
  ['#FFDB01', '#0E197D'],
  ['#FEC163', '#DE4313'],
  ['#92FFC0', '#002661'],
  ['#EEAD92', '#6018DC'],
  ['#F6CEEC', '#D939CD'],
  ['#52E5E7', '#130CB7'],
  ['#F1CA74', '#A64DB6'],
  ['#E8D07A', '#5312D6'],
  ['#EECE13', '#B210FF'],
  ['#79F1A4', '#0E5CAD'],
  ['#FDD819', '#E80505'],
  ['#FFF3B0', '#CA26FF'],
  ['#FFF5C3', '#9452A5'],
  ['#F05F57', '#360940'],
  ['#2AFADF', '#4C83FF'],
  ['#FFF886', '#F072B6'],
  ['#97ABFF', '#123597'],
  ['#F5CBFF', '#C346C2'],
  ['#FFF720', '#3CD500'],
  ['#FF6FD8', '#3813C2'],
  ['#EE9AE5', '#5961F9'],
  ['#FFD3A5', '#FD6585'],
  ['#C2FFD8', '#465EFB'],
  ['#FD6585', '#0D25B9'],
  ['#FD6E6A', '#FFC600'],
  ['#65FDF0', '#1D6FA3'],
  ['#6B73FF', '#000DFF'],
  ['#FF7AF5', '#513162'],
  ['#F0FF00', '#58CFFB'],
  ['#FFE985', '#FA742B'],
  ['#FFA6B7', '#1E2AD2'],
  ['#FFAA85', '#B3315F'],
  ['#72EDF2', '#5151E5'],
  ['#FF9D6C', '#BB4E75'],
  ['#F6D242', '#FF52E5'],
  ['#69FF97', '#00E4FF'],
  ['#3B2667', '#BC78EC'],
  ['#70F570', '#49C628'],
  ['#3C8CE7', '#00EAFF'],
  ['#FAB2FF', '#1904E5'],
  ['#81FFEF', '#F067B4'],
  ['#FFA8A8', '#FCFF00'],
  ['#FFCF71', '#2376DD'],
  ['#FF96F9', '#C32BAC'],
];

class CreateEvent extends Component {
  state = {
    title: '',
    shortDescription: '',
    description: '',
    humanLocation: '',
    gpsLocation: '',
    startTime: '',
    endTime: '',
    selectedColor: '#FDEB71,#F8D800',
  };
  async handleSubmit() {
    const { email, password } = this.state;

    const response = await this.context.fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
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
      log('Success!');
    } else {
      logError(data.error);
    }
  }
  handleInputChange(key, data) {
    log('handleInputChange');
    this.setState({
      [key]: data.value,
    });
  }
  handleColorClicked(color) {
    this.setState({
      selectedColor: color.toString(),
    });
  }
  render() {
    const {
      title,
      shortDescription,
      description,
      selectedColor,
      humanLocation,
      gpsLocation,
      startTime,
      endTime,
    } = this.state;
    return (
      <SemanticUI>
        <Container text style={{ marginBottom: '3em' }}>
          <Header as="h1" style={{ marginTop: '2em' }}>
            Create Event
          </Header>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                type="text"
                value={title}
                onChange={(e, d) => this.handleInputChange('title', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Short Description</label>
              <Input
                type="text"
                value={shortDescription}
                onChange={(e, d) =>
                  this.handleInputChange('shortDescription', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Location Human</label>
              <Input
                type="text"
                value={humanLocation}
                onChange={(e, d) => this.handleInputChange('humanLocation', d)}
              />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <Input
                type="text"
                value={gpsLocation}
                onChange={(e, d) => this.handleInputChange('gpsLocation', d)}
              />
            </Form.Field>
            <Form.Group>
              <Form.Field width={2}>
                <label>Start time</label>
                <Input
                  type="text"
                  value={startTime}
                  placeholder="17:00"
                  onChange={(e, d) => this.handleInputChange('startTime', d)}
                />
              </Form.Field>
              <Form.Field width={2}>
                <label>End time</label>
                <Input
                  type="text"
                  value={endTime}
                  placeholder="19:00"
                  onChange={(e, d) => this.handleInputChange('endTime', d)}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Description</label>
              <TextArea
                autoHeight
                value={description}
                style={{ minHeight: 100 }}
                onChange={(e, d) => this.handleInputChange('description', d)}
              />
            </Form.Field>

            <Form.Field>
              <label>Background</label>
              <div className={s.colors}>
                {colorData.map(color => (
                  <div
                    key={color.toString()}
                    className={s.color}
                    style={{
                      backgroundImage: `linear-gradient( 135deg, ${color[0]} 10%, ${color[1]} 100%)`,
                    }}
                    onClick={() => this.handleColorClicked(color)}
                  >
                    {color.toString() === selectedColor && (
                      <Icon name="check" size="big" />
                    )}
                  </div>
                ))}
              </div>
            </Form.Field>

            <Button primary size="large" onClick={() => this.handleSubmit()}>
              Create event
            </Button>
          </Form>
        </Container>
      </SemanticUI>
    );
  }
}

export default withStyles(s)(CreateEvent);
