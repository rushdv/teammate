import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }
    
    const collection = db.collection('teams');
    
    // Check if index exists and drop it
    const indexes = await collection.indexes();
    const hasIndex = indexes.some(idx => idx.name === 'country_1');
    
    if (hasIndex) {
      await collection.dropIndex('country_1');
      return NextResponse.json({ message: 'Index country_1 dropped successfully' });
    } else {
      return NextResponse.json({ message: 'Index country_1 not found' });
    }
  } catch (error: any) {
    console.error('Drop index error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
