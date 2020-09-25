import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { validateReq, BadRequestError } from '@milkysinghtickets/common';
import { User } from '../models/users';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
const router = express();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Provide a valid email.'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateReq,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //check if the supplied email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentails');
    }
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentails');
    }
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    //store it on the session object
    req.session = { jwt: userJwt };

    res.status(201).send(existingUser);
  }
);
export { router as signinRouter };
