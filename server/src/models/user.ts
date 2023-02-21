import { Schema, model, Types } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  avatar: string;
  allProperties: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  allProperties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
});

const User = model<IUser>('User', userSchema);

export default User;
