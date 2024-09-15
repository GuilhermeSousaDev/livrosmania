import { NextRequest, NextResponse } from 'next/server';

import Book from '@/app/api/models/Book';
import User from '@/app/api/models/User';
import { connectDB } from '@/app/api/lib/mongodb';
import { bookSchema } from '@/app/schemas/bookSchema';

export async function GET() {
  try {
    await connectDB();

    const books = await Book.find({
      isDeleted: false,
      deletedAt: null,
    });

    return NextResponse.json({ books });
  } catch (error: any) {
    return NextResponse.json({ ok: false, message: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    bookSchema.parse(data);

    const user = await User.findOne({ email: data.user_email });

    const newBook = new Book({
      title: data.title,
      description: data?.description,
      cover: data?.cover,
      content: data?.content,
      author: user._id,
    });

    await newBook.save();

    return NextResponse.json({ ok: true, book: newBook });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
