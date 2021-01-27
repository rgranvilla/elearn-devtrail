import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public execute({ name, email, password }: RequestDTO): User {
    const findUserWithSameEmail = this.usersRepository.findByEmail(email);

    if (findUserWithSameEmail) {
      throw Error('This e-mail is already being used');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
