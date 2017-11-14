/* eslint-disable no-unused-vars */
import Sequelize from 'sequelize';
import { GraphQLList as List, GraphQLBoolean as BooleanType } from 'graphql';
import UserType from '../types/UserType';
import { User } from '../models';

const users = {
  type: new List(UserType),
  args: {
    random: {
      type: BooleanType,
    },
  },
  async resolve({ req }, { random }) {
    const search = {
      attributes: ['id', 'name', 'image', 'title'],
      where: {
        isPublic: true,
      },
      limit: 20,
    };

    if (random) {
      search.order = [Sequelize.fn('RANDOM')];
    }

    return User.findAll(search);
  },
};

export default users;
