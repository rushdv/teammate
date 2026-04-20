import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Unassigned from '@/models/Unassigned';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name } = await request.json();

    const entry = await Unassigned.create({ name });

    return NextResponse.json({ status: 'ok', data: entry }, { status: 201 });
  } catch (error: any) {
    console.error('Unassigned registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
