import { Request, Response } from 'express';
import User from '../models/user';

const getAllUsers = async (req: Request, res: Response) => {};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const newUser = await User.create({
      name,
      email,
      avatar,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserInfoById = async (req: Request, res: Response) => {};

export { getAllUsers, createUser, getUserInfoById };
