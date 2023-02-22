import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Property from '../models/property';
import User from '../models/user';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({}).limit(Number(req.query._end));

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetails = async (req: Request, res: Response) => {};

const createProperty = async (req: Request, res: Response) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // Start a new session...
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);
    if (!user) throw new Error('User not found.');

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(201).json({ message: 'Property Created Successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProperty = async (req: Request, res: Response) => {};

const deleteProperty = async (req: Request, res: Response) => {};

export {
  getAllProperties,
  getPropertyDetails,
  createProperty,
  updateProperty,
  deleteProperty,
};
