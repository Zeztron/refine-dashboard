import { DatabaseConnectionError } from './errors/databaseConnectionError';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect';

import userRouter from './routes/user.route';
import propertyRouter from './routes/property.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/properties', propertyRouter);

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGODB_URL);
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  app.listen(8080, () => {
    console.log('Server started on port http://localhost:8080');
  });
};

startServer();
