import { writeFile, unlink } from 'fs';
import path from 'path';
const { CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_USER } = process.env;

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

import Book from '@/app/api/models/Book';
import { updateBookSchema } from '@/app/schemas/bookSchema';
import User from '@/app/api/models/User';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bookId: string; userEmail: string } },
) {
  const { bookId, userEmail } = params;

  const formData = await req.formData();

  const file = formData.get('file') as any;

  if (!file) {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const public_id = `book_cover/${bookId}`;

  cloudinary.config({
    cloud_name: CLOUDINARY_USER,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');
    const filePath = path.join(process.cwd(), 'public/' + filename);

    writeFile(filePath, buffer, () => {});

    const upload = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',
      public_id,
      transformation: [
        {
          width: 125,
          height: 200,
          quality: 100,
        },
      ],
    });

    unlink(filePath, () => {});

    const user = await User.findOne({ email: userEmail });
    const book = await Book.findById(bookId);

    if (user._id !== book.author) throw new Error('unauthorized');

    const updatedBook = await Book.updateOne(
      { _id: bookId },
      { $set: { cover: upload.url } },
      { new: true },
    );

    return NextResponse.json({ ok: true, book: updatedBook });
  } catch (error) {
    return NextResponse.json({ ok: false, error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string; userEmail: string } },
) {
  const { bookId, userEmail } = params;

  try {
    const data = await req.json();

    updateBookSchema.parse(data);

    const user = await User.findOne({ email: userEmail });
    const book = await Book.findById(bookId);

    if (user._id !== book.author) throw new Error('unauthorized');

    const updatedBook = await Book.updateOne(
      { _id: bookId },
      { $set: data },
      { new: true },
    );

    return NextResponse.json({ ok: true, book: updatedBook });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { bookId: string; userEmail: string } },
) {
  const { bookId, userEmail } = params;

  try {
    const user = await User.findOne({ email: userEmail });
    const book = await Book.findById(bookId);

    if (user._id !== book.author) throw new Error('unauthorized');

    const updatedBook = await Book.updateOne(
      { _id: bookId },
      {
        $set: {
          deletedAt: new Date(),
          isDeleted: true,
        },
      },
      { new: true },
    );

    return NextResponse.json({ ok: true, book: updatedBook });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
