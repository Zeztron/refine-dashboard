import { Schema, model, Types } from 'mongoose';

interface IProperty {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number;
  photo: string;
  creator: Types.ObjectId;
}

const propertySchema = new Schema<IProperty>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Property = model<IProperty>('Property', propertySchema);

export default Property;
