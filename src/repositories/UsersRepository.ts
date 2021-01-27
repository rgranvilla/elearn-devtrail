import User from '../models/User';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public create(name: string, email: string, password: string): User {
    const user = new User(name, email, password);

    this.users.push(user);

    return user;
  }

  public findByEmail(email: string): User | null {
    const findUser = this.users.find(user => email === user.email);

    return findUser || null;
  }
}

export default UsersRepository;
