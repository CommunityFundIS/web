import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TopicType = new ObjectType({
  name: 'Topic',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType },
    color: { type: StringType },
  },
});

export default TopicType;
