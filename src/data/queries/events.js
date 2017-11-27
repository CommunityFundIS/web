/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import EventType from '../types/EventType';
import { Event, Group } from '../models';

const events = {
  type: new List(EventType),
  args: {
    id: {
      type: StringType,
    },
    slug: {
      type: StringType,
    },
    groupSlug: {
      type: StringType,
    },
    groupId: {
      type: StringType,
    },
  },
  async resolve({ req }, { id, slug, groupSlug, groupId }) {
    let group = id ? null : groupId;

    if (!id && !group) {
      const groupObj = await Group.findOne({
        where: {
          slug: groupSlug,
        },
      });

      if (!groupObj) {
        console.error('No group given');
        return [];
      }
      group = groupObj.id;
    }

    const search = {
      attributes: [
        'id',
        'name',
        'slug',
        'logo',
        'briefing',
        'description',
        'color',
        'gradient',
        'location',
        'geolocation',
        'startTime',
        'endTime',
        'groupId',
      ],
      where: {},
      limit: 20,
    };

    if (id) {
      search.where.id = id;
    }

    if (slug) {
      search.where.slug = slug;
    }

    if (group) {
      search.where.groupId = group;
    }

    return Event.findAll(search);
  },
};

export default events;
