import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLInt as IntType,
} from 'graphql';
import { Attending } from '../models';
import GroupType from './GroupType';

const Event = new ObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    slug: { type: StringType },
    logo: { type: StringType },
    briefing: { type: StringType },
    description: { type: StringType },
    color: { type: StringType },
    gradient: { type: StringType },
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
    attendingStatus: {
      type: IntType, // @TODO change to enum
      resolve: async (event, _, req) => {
        if (!req.user || !req.user.id) return -1;
        const attending = await Attending.findOne({
          where: {
            eventId: event.id,
            userId: req.user.id,
          },
        });

        return attending ? attending.status : -1;
      },
    },
    startTime: { type: StringType },
    endTime: { type: StringType },
  }),
});

export default Event;
