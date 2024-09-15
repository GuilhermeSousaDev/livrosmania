import mongoose, { Schema, model } from 'mongoose';

import { BookDocument } from './Book';

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  image: string;
  content?: JSON;
  books: BookDocument[];
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
      unique: false,
    },
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || model<UserDocument>('User', UserSchema);

export default User;
