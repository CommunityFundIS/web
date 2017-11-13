/* eslint-disable import/prefer-default-export */
import { TOPICS_UPDATE_DATA } from '../constants';
import { log, logError } from '../logger';

export const fetchTopics = () => async (
  dispatch,
  getState,
  { graphqlRequest },
) => {
  try {
    const { data } = await graphqlRequest(
      `
        {
          topics{
            id,
            name,
            color
          }
        }
        `,
    );
    const { topics } = data;

    log('got back topics', topics);

    dispatch({
      type: TOPICS_UPDATE_DATA,
      payload: {
        data: topics,
      },
    });
  } catch (e) {
    logError('Could not fetch topics', e);
  }
};
