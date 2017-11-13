import { GraphQLList as List } from 'graphql';
import TopicType from '../types/TopicType';
import { Topic } from '../models';

const topics = {
  type: new List(TopicType),
  resolve() {
    return Topic.findAll({
      attributes: ['id', 'name', 'color'],
      raw: true,
    });
  },
};

export default topics;
