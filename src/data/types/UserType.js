import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import TopicType from './TopicType';

const UserType = new ObjectType({
  name: 'User',
  fields: {
    id: { type: new NonNull(ID) },
    email: { type: StringType },
    name: { type: StringType },
    image: { type: StringType },
    title: { type: StringType },
    topics: {
      type: new List(TopicType),
      async resolve(doc) {
        // doc is the current document, a sequelize user
        // @TODO might be bad to depend on the sequelize model for this
        return [...(await doc.getTopics())].map(topic => ({
          id: topic.id,
          name: topic.name,
          color: topic.color,
        }));
      },
    },
  },
});

export default UserType;
