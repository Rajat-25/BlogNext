import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../schemas/user';
import { Code, signInBody, signUpBody } from '../utils';
const router = Router();
const jwtSecret = process.env.JWT_SECRET!;

router.post('/signup', async (req, res) => {
  const userData = req.body;
  const { success } = signUpBody.safeParse(userData);

  const isUserExist = await User.findOne({
    email: req.body.email,
  });

  if (!success || isUserExist) {
    return res
      .status(Code.credErr)
      .json({ message: 'Invalid credentials/User already exist' });
  }

  try {
    const userDb = await User.create(userData);

    const { firstName, lastName, _id, email } = userDb;

    const token = jwt.sign({ userId: userDb._id }, jwtSecret);

    return res.status(Code.success).json({
      message: 'User created Successfully',
      token,
      data: {
        firstName,
        lastName,
        _id,
        email,
      },
    });
  } catch (err) {
    return res.status(Code.servErr).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  const userData = req.body;
  const { success } = signInBody.safeParse(userData);

  const userDb = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  }).select('firstName lastName email');

  if (!success || !userDb) {
    return res.status(Code.credErr).json({ message: 'Invalid credentials' });
  }

  try {
    const token = jwt.sign({ userId: userDb._id }, jwtSecret);

    return res.status(Code.success).json({
      message: 'User Signed In Successfully',
      token,
      data: userDb,
    });
  } catch (err) {
    return res.status(Code.servErr).json({ message: 'Internal server error' });
  }
});

export default router;
