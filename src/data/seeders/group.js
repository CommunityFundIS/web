/* eslint-disable import/prefer-default-export */
import { Group } from '../models';
import { log } from '../../logger';

export const up = async () => {
  log('Group: Seeding');

  await Group.sync();

  await Group.bulkCreate(
    [0, 1, 2, 3, 4].map(i => ({
      name: `Community ${i}`,
      slug: `community-${i}`,
      logo: 'http://rvkjs.com/images/reykjavikjs.png',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere vestibulum diam ut tristique. Maecenas rutrum tristique vulputate. Mauris eleifend elit sed mollis tristique. Proin ut sodales purus. Vivamus ac pretium metus. Etiam quam purus, volutpat posuere nibh at, egestas aliquam lectus. Maecenas convallis eros et lacus scelerisque, a accumsan sapien dictum. Mauris leo ex, pharetra ut metus sit amet, efficitur commodo erat. Phasellus vel feugiat est. Ut accumsan sapien orci, non sodales nibh euismod vel. Phasellus pellentesque felis ante, vel condimentum diam vehicula et.',
    })),
  );

  await Group.create({
    name: 'Reykjavik JS',
    slug: 'rvk-js',
    logo: 'http://rvkjs.com/images/reykjavikjs.png',
    description:
      'A free + public hangout for JavaScript enthusiasts that happens in Reykjavik, Iceland, just before JSConf Iceland. No presentations, RSVPs or any formal schedule, just show up and talk, learn and hack!',
  });

  log('Group: Done seeding');
};

export const down = async () => {
  log('Group: Flushing');

  await Group.sync();

  await Group.truncate();

  log('Group: Done Flushing');
};
