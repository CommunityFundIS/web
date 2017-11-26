/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import EventType from '../types/EventType';
import { Event, Group } from '../models';

const events = {
  type: new List(EventType),
  args: {
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
  async resolve({ req }, { slug, groupSlug, groupId }) {
    let group = groupId;

    if (!group) {
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
      where: {
        groupId: group,
      },
      limit: 20,
    };

    if (slug) {
      search.where.slug = slug;
    }

    return Event.findAll(search);
  },
};

export default events;
