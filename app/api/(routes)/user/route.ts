import { NextRequest, NextResponse } from 'next/server';

import { connectDB } from '../../lib/mongodb';
import User from '../../models/User';

import { userSchema } from '@/app/schemas/userSchema';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const data = await req.json();

    userSchema.parse(data);

    const existentUser = await User.findOne({ email: data.email });

    if (existentUser.isDeleted && existentUser.deletedAt) {
      await User.updateOne(
        { _id: existentUser._id },
        { isDeleted: false, deletedAt: null },
      );
    }

    if (existentUser) return existentUser;

    const newUser = new User({
      name: data.name,
      email: data?.email,
      image: data?.image,
    });

    await newUser.save();

    return NextResponse.json({ ok: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }
}
