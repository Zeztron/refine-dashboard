import { Query } from './../interfaces/query';
import { Request, RequestHandler, Response } from 'express';
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

const getAllProperties: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = '',
    propertyType = '',
  } = req.query;

  const query: Query = {};

  if (propertyType !== '') {
    query.propertyType = propertyType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: 'i' };
  }

  try {
    const count = await Property.countDocuments({ query });

    const properties = await Property.find(query)
      .limit(Number(_end))
      .skip(Number(_start))
      // @ts-ignore
      .sort({ [_sort]: _order });

    res.header('x-total-count', count as unknown as string);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPropertyDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const property = await Property.findOne({ _id: id }).populate('creator');

  if (property) return res.status(200).json(property);

  return res.status(404).json({ message: 'Property not found' });
};

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
