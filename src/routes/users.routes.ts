import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const findUserWithSameEmail = usersRepository.findByEmail(email);

  if (findUserWithSameEmail) {
    return response
      .status(400)
      .json({ message: 'This e-mail is already being used' });
  }

  const user = usersRepository.create({
    name,
    email,
    password,
  });

  return response.json(user);
});

export default usersRouter;
