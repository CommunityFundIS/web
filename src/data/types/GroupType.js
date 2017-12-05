import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import EventType from './EventType';

const Group = new ObjectType({
  name: 'Group',
  fields: () => ({
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    slug: { type: StringType },
    logo: { type: StringType },
    description: { type: StringType },
    color: { type: StringType },
    gradient: { type: StringType },
    events: {
      type: new List(EventType),
      resolve: group => group.getEvents(),
    },
  }),
});

export default Group;
