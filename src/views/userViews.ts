import User from '../models/User';

export default {
  render(user: User): Omit<User, 'password'> {
    return {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  },
};
