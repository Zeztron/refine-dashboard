import mongoose from 'mongoose';

const connectDB = async (url: string) => {
  mongoose.set('strictQuery', true);

  await mongoose.connect(url);
  console.log('Connected to MongoDB');
};

export default connectDB;
