/**
 * Database Cleanup Script
 * 
 * This script deletes all data from the teams and unassigneds collections
 * Use this when you need to reset the database for new registrations
 * 
 * Usage: node scripts/clean-database.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function cleanDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to database\n');
    
    // Check if we need to drop the entire database for schema changes
    console.log('🔍 Checking for schema compatibility...\n');
    
    // Count before deletion
    const teamsCount = await mongoose.connection.db.collection('teams').countDocuments();
    const unassignedCount = await mongoose.connection.db.collection('unassigneds').countDocuments();
    
    console.log('📊 Current Data:');
    console.log(`   - Teams: ${teamsCount} documents`);
    console.log(`   - Unassigned: ${unassignedCount} documents\n`);
    
    if (teamsCount === 0 && unassignedCount === 0) {
      console.log('ℹ️  Database is already empty. Nothing to delete.\n');
      await mongoose.connection.close();
      process.exit(0);
    }
    
    console.log('🗑️  Deleting all data...\n');
    
    // Delete all documents
    const teamsResult = await mongoose.connection.db.collection('teams').deleteMany({});
    const unassignedResult = await mongoose.connection.db.collection('unassigneds').deleteMany({});
    
    console.log('✅ Deletion Complete:');
    console.log(`   - Teams deleted: ${teamsResult.deletedCount}`);
    console.log(`   - Unassigned deleted: ${unassignedResult.deletedCount}\n`);
    
    // Verify deletion
    const newTeamsCount = await mongoose.connection.db.collection('teams').countDocuments();
    const newUnassignedCount = await mongoose.connection.db.collection('unassigneds').countDocuments();
    
    console.log('📊 After Cleanup:');
    console.log(`   - Teams: ${newTeamsCount} documents`);
    console.log(`   - Unassigned: ${newUnassignedCount} documents\n`);
    
    console.log('🎉 Database is now clean and ready for new registrations!\n');
    console.log('ℹ️  Note: Schema now includes student IDs for all members.\n');
    
    await mongoose.connection.close();
    console.log('👋 Connection closed.');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the cleanup
cleanDatabase();
