import { NextResponse } from 'next/server';

import { connectDB } from '@/app/api/lib/mongodb';
import Book from '@/app/api/models/Book';
import User from '@/app/api/models/User';

export async function GET(
  _: Request,
  { params }: { params: { userEmail: string } },
) {
  const { userEmail } = params;

  try {
    await connectDB();

    const user = await User.findOne({ email: userEmail });

    const books = await Book.find({
      author: user._id,
      isDeleted: false,
      deletedAt: null,
    });

    return NextResponse.json({ books });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message },
      { status: 500 },
    );
  }
}
