import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Unassigned from '@/models/Unassigned';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, studentId } = await request.json();

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!studentId || !studentId.trim()) {
      return NextResponse.json(
        { message: 'Student ID is required' },
        { status: 400 }
      );
    }

    const entry = await Unassigned.create({ name: name.trim(), studentId: studentId.trim() });

    return NextResponse.json({ status: 'ok', data: entry }, { status: 201 });
  } catch (error: any) {
    console.error('Unassigned registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
