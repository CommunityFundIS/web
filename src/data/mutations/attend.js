import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLObjectType as ObjectType,
  GraphQLBoolean as BooleanType,
  GraphQLString as StringType,
} from 'graphql';

import { Attending } from '../models';

export default {
  type: new ObjectType({
    name: 'AttendStatus',
    fields: () => ({
      success: { type: BooleanType },
    }),
  }),
  args: {
    eventId: { type: new NonNull(ID) },
    action: { type: StringType },
  },
  resolve: async ({ req }, { eventId, action }) => {
    if (!req.user) {
      throw Error('Must be authenticated');
    }

    Attending.upsert({
      eventId,
      userId: req.user.id,
      status: action !== 'attend' ? 0 : 1,
    });

    return { success: true };
  },
};
