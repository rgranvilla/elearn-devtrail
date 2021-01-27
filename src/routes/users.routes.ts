import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const usersRepository = new UsersRepository();

usersRouter.get('/', (request, response) => {
  const users = usersRepository.all();

  return response.json(users);
});

usersRouter.post('/', (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({ name, email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
