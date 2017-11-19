import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const Event = new ObjectType({
  name: 'Event',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    slug: { type: StringType },
    briefing: { type: StringType },
    description: { type: StringType },
    location: { type: StringType },
    startTime: { type: StringType },
    endTime: { type: StringType },
  },
});

export default Event;
