/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import {
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
} from 'graphql';
import UserType from '../types/UserType';
import { User } from '../models';

const { Op } = Sequelize;

const users = {
  type: new List(UserType),
  args: {
    random: {
      type: BooleanType,
    },
    count: {
      type: IntType,
    },
    onlyWithName: {
      type: BooleanType,
    },
  },
  async resolve({ req }, { random, count, onlyWithName }) {
    const search = {
      attributes: ['id', 'name', 'image', 'title'],
      where: {
        isPublic: true,
      },
      limit: count || 20,
    };

    if (onlyWithName) {
      search.where.name = {
        [Op.ne]: null,
      };
    }

    if (random) {
      search.order = [Sequelize.fn('RANDOM')];
    } else {
      search.order = ['name'];
    }

    return User.findAll(search);
  },
};

export default users;
