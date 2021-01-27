import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface User {
  userId: string;
  name: string;
  email: string;
  password: string;
}

const usersRouter = Router();

const users: User[] = [];

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const findUserWithSameEmail = users.find(user => email === user.email);

  if (findUserWithSameEmail) {
    return response
      .status(400)
      .json({ message: 'This e-mail is already being used' });
  }

  const user = {
    userId: uuidv4(),
    name,
    email,
    password,
  };

  users.push(user);

  return response.json(user);
});

export default usersRouter;
