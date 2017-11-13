import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLBoolean as BooleanType,
} from 'graphql';
import UserType from '../types/UserType';
import { User, UserTopic } from '../models';
import { logError } from '../../logger';

const updateUser = {
  type: UserType,
  args: {
    name: { type: new NonNull(StringType) },
    title: { type: new NonNull(StringType) },
    image: { type: new NonNull(StringType) },
    isPublic: { type: BooleanType },
    topics: { type: new List(StringType) },
  },
  resolve: async ({ req }, { name, title, image, isPublic, topics }) => {
    if (!req.user) {
      throw Error('Must be authenticated');
    }

    try {
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      let shouldUpdateUser = false;

      if (name !== user.name) {
        shouldUpdateUser = true;
        user.set('name', name);
      }

      if (title !== user.title) {
        shouldUpdateUser = true;
        user.set('title', title);
      }

      if (image !== user.image) {
        shouldUpdateUser = true;
        user.set('image', image);
      }

      if (isPublic !== user.isPublic) {
        shouldUpdateUser = true;
        user.set('isPublic', isPublic);
      }

      if (shouldUpdateUser) {
        await user.save();
      }

      const currentTopics = await user.getTopics({
        raw: true,
      });

      const topicsToRemove = currentTopics
        .map(t => t.id)
        .filter(topicId => !topics.includes(topicId));

      // Remove topics
      await Promise.all(
        topicsToRemove.map(topicId =>
          UserTopic.destroy({
            where: {
              userId: user.id,
              topicId,
            },
          }),
        ),
      );

      // Create or modify topics
      await Promise.all(
        topics.map((topicId, index) =>
          UserTopic.upsert({
            topicId,
            order: index,
            userId: user.id,
          }),
        ),
      );

      return {};
    } catch (e) {
      logError(e);
      throw Error('Something went wrong');
    }
  },
};

export default updateUser;
