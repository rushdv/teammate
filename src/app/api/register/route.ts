import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Team from '@/models/Team';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  console.log('API: POST /api/register hit');
  try {
    await dbConnect();
    
    // TEMPORARY: Automatically drop the old 'country' index if it exists
    try {
      const db = mongoose.connection.db;
      if (db) {
        const collection = db.collection('teams');
        const indexes = await collection.indexes();
        if (indexes.some(idx => idx.name === 'country_1')) {
          console.log('Dropping obsolete country_1 index...');
          await collection.dropIndex('country_1');
        }
      }
    } catch (indexError) {
      console.warn('Could not drop index (it might already be gone):', indexError);
    }

    const { teamName, members } = await request.json();

    // Validate members have both name and studentId
    const validMembers = members.filter((m: any) => 
      m.name && m.name.trim() !== '' && m.studentId && m.studentId.trim() !== ''
    );

    if (validMembers.length === 0) {
      return NextResponse.json(
        { message: 'At least one member with name and student ID is required' },
        { status: 400 }
      );
    }

    const team = await Team.create({
      teamName,
      members: validMembers,
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
