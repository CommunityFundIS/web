import UserType from '../types/UserType';
import { User } from '../models';

const me = {
  type: UserType,
  resolve({ req }) {
    if (!req.user) return Error('Not logged in');
    return User.findOne({
      where: {
        id: req.user.id,
      },
    });
  },
};

export default me;
