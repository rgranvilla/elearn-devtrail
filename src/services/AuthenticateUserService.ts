import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign(
      {},
      '8820fc706ebd22e1b8bb7de51764bfd0ffa8b58ef11d52388ae32a391945bf91',
      {
        subject: user.user_id,
        expiresIn: '1d',
      },
    );

    return {
      user,
      token,
    };
  }
}
export default AuthenticateUserService;
