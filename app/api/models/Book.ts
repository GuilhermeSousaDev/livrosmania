import mongoose, { Document, Schema, model } from 'mongoose';

import { UserDocument } from './User';

export interface BookDocument extends Document {
  _id: string;
  title: string;
  author: UserDocument | UserDocument['_id'];
  description?: string;
  cover?: string;
  content?: JSON;
  isDeleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: false,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author required'],
    },
    description: String,
    cover: String,
    content: Schema.Types.Mixed,
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

const Book = mongoose.models?.Book || model<BookDocument>('Book', BookSchema);

export default Book;
