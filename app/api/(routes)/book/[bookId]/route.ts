import { writeFile, unlink } from 'fs';
import path from 'path';
const { CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_USER } = process.env;

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

import Book from '@/app/api/models/Book';
import { updateBookSchema } from '@/app/schemas/bookSchema';

export async function GET(
  _: Request,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params;

  try {
    const book = await Book.findById(bookId);

    if (!book)
      return NextResponse.json({ ok: false, message: 'Book not found' });

    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params;

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

    const book = await Book.findByIdAndUpdate(bookId, {
      cover: upload.url,
    });

    return NextResponse.json({ ok: true, book });
  } catch (error) {
    return NextResponse.json({ ok: false, error });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params;

  try {
    const data = await req.json();

    updateBookSchema.parse(data);

    const book = await Book.findByIdAndUpdate(bookId, data, { new: true });

    return NextResponse.json({ ok: true, book });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { bookId: string } },
) {
  const { bookId } = params;

  try {
    const book = await Book.findByIdAndUpdate(
      bookId,
      {
        deletedAt: new Date(),
        isDeleted: true,
      },
      { new: true },
    );

    return NextResponse.json({ ok: true, book });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
