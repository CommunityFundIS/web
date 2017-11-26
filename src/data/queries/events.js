/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import EventType from '../types/EventType';
import { Event } from '../models';

const events = {
  type: new List(EventType),
  args: {
    slug: {
      type: StringType,
    },
  },
  async resolve({ req }, { slug }) {
    const search = {
      attributes: [
        'id',
        'name',
        'slug',
        'briefing',
        'description',
        'color',
        'location',
        'geolocation',
        'startTime',
        'endTime',
        'groupId',
      ],
      where: {},
      limit: 20,
    };

    if (slug) {
      search.where.slug = slug;
    }

    return Event.findAll(search);
  },
};

export default events;
