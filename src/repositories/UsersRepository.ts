import User from '../models/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public create({ name, email, password }: CreateUserDTO): User {
    const user = new User({ name, email, password });

    this.users.push(user);

    return user;
  }

  public all(): User[] {
    return this.users;
  }

  public findByEmail(email: string): User | null {
    const findUser = this.users.find(user => email === user.email);

    return findUser || null;
  }
}

export default UsersRepository;
