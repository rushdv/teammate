import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Team from '@/models/Team';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { teamName, members } = await request.json();

    const team = await Team.create({
      teamName,
      members: members.filter((m: string) => m.trim() !== ''),
    });

    return NextResponse.json({ status: 'ok', data: team }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
