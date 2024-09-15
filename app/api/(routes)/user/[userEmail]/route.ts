import { NextResponse } from 'next/server';

import User from '@/app/api/models/User';
import Book from '@/app/api/models/Book';

export async function GET(
  _: Request,
  { params }: { params: { userEmail: string } },
) {
  const { userEmail } = params;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user)
      return NextResponse.json({ ok: false, message: 'User not found' });

    const userBooks = await Book.find({ author: user._id }).select([
      'id',
      'cover',
    ]);

    return NextResponse.json({ ok: true, user, userBooks });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { userEmail: string } },
) {
  const { userEmail } = params;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user)
      return NextResponse.json({ ok: false, message: 'User not found' });

    await User.updateOne(
      { email: userEmail },
      { isDeleted: true, deletedAt: new Date() },
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
