import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const VoteType = new ObjectType({
  name: 'Vote',
  fields: {
    id: { type: new NonNull(ID) },
    comment: { type: StringType },
    result: { type: new NonNull(StringType) },
  },
});

export default VoteType;
