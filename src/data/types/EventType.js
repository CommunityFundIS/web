import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
} from 'graphql';

import GroupType from './GroupType';

const Event = new ObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    slug: { type: StringType },
    briefing: { type: StringType },
    description: { type: StringType },
    location: { type: StringType },
    geolocation: {
      type: new List(FloatType),
      resolve(event) {
        return event.geolocation && event.geolocation.coordinates;
      },
    },
    group: {
      type: GroupType,
      resolve: event => event.getGroup(),
    },
    startTime: { type: StringType },
    endTime: { type: StringType },
  }),
});

export default Event;
