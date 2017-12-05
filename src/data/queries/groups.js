/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import { GraphQLList as List, GraphQLString as StringType } from 'graphql';
import GroupType from '../types/GroupType';
import { Group } from '../models';

const groups = {
  type: new List(GroupType),
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
        'logo',
        'description',
        'color',
        'gradient',
      ],
      where: {},
      limit: 20,
    };

    if (slug) {
      search.where.slug = slug;
    }

    return Group.findAll(search);
  },
};

export default groups;
